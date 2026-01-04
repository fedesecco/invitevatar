import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';
import { SupabaseService } from '../supabase/supabase.service';
import { SaveApiKeyDto } from './dto/save-api-key.dto';

@Injectable()
export class ApiKeysService {
  private readonly masterKey: Buffer;

  constructor(
    private readonly supabase: SupabaseService,
    config: ConfigService
  ) {
    const keyB64 =
      config.get<string>('KEY_ENCRYPTION_KEY') ||
      config.get<string>('API_KEY_ENCRYPTION_KEY');

    if (!keyB64) {
      throw new Error('KEY_ENCRYPTION_KEY must be set');
    }

    const key = Buffer.from(keyB64, 'base64');
    if (key.byteLength !== 32) {
      throw new Error('KEY_ENCRYPTION_KEY must be 32 bytes (base64 of 32 bytes)');
    }

    this.masterKey = key;
  }

  private encrypt(rawKey: string) {
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv('aes-256-gcm', this.masterKey, iv);
    const encrypted = Buffer.concat([cipher.update(rawKey, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    // Store ciphertext + tag together; tag is needed for decryption.
    const payload = Buffer.concat([encrypted, tag]).toString('base64');
    return { iv: iv.toString('base64'), ciphertext: payload };
  }

  private async getUserIdFromAuth(authHeader?: string): Promise<string> {
    if (!authHeader?.toLowerCase().startsWith('bearer ')) {
      throw new UnauthorizedException('Missing or invalid Authorization header');
    }

    const token = authHeader.slice(7);
    const client = this.supabase.getClient();
    const { data, error } = await client.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }

    return data.user.id;
  }

  async saveKey(authHeader: string | undefined, dto: SaveApiKeyDto) {
    const userId = await this.getUserIdFromAuth(authHeader);
    const apiKey = dto.apiKey.trim();

    if (!apiKey) {
      throw new BadRequestException('apiKey cannot be empty');
    }

    const provider = dto.provider?.trim() || 'openai';
    const keyLabel = dto.label?.trim() || null;
    const { iv, ciphertext } = this.encrypt(apiKey);

    const client = this.supabase.getClient();
    const { error } = await client
      .from('user_api_keys')
      .upsert(
        {
          user_id: userId,
          provider,
          key_label: keyLabel,
          encrypted_key: ciphertext,
          iv,
        },
        { onConflict: 'user_id,provider' }
      );

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return { ok: true };
  }
}
