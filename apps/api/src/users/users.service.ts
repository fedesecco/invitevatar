import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) {}

  async create(dto: CreateUserDto) {
    const client = this.supabase.getClient();

    const { data: adminCreate, error: adminError } =
      await client.auth.admin.createUser({
        email: dto.email,
        password: dto.password,
        email_confirm: true,
        user_metadata: {
          displayName: dto.displayName,
        },
      });

    if (adminError) {
      throw new InternalServerErrorException(adminError.message);
    }

    const userId = adminCreate.user?.id;
    if (!userId) {
      throw new InternalServerErrorException('User was not created');
    }

    const { error: profileError } = await client.from('user_profiles').insert({
      id: userId,
      email: dto.email,
      display_name: dto.displayName ?? '',
      role: 'owner',
    });

    if (profileError) {
      throw new InternalServerErrorException(profileError.message);
    }

    return { id: userId, email: dto.email, displayName: dto.displayName ?? '' };
  }

  async findOne(id: string) {
    const client = this.supabase.getClient();
    const { data, error } = await client
      .from('user_profiles')
      .select('id, email, display_name, role')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        throw new NotFoundException('User not found');
      }
      throw new InternalServerErrorException(error.message);
    }

    return {
      id: data.id,
      email: data.email,
      displayName: data.display_name,
      role: data.role,
    };
  }
}
