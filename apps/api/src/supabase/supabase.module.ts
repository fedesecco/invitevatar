import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from './supabase.constants';
import { SupabaseService } from './supabase.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: SUPABASE_CLIENT,
      inject: [ConfigService],
      useFactory: (config: ConfigService): SupabaseClient => {
        const url =
          config.get<string>('API_SUPABASE_URL') ||
          config.get<string>('SUPABASE_URL');
        const serviceRoleKey =
          config.get<string>('API_SUPABASE_SERVICE_ROLE_KEY') ||
          config.get<string>('SUPABASE_SERVICE_ROLE_KEY');

        if (!url || !serviceRoleKey) {
          throw new Error(
            'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set'
          );
        }

        return createClient(url, serviceRoleKey, {
          auth: {
            autoRefreshToken: false,
            persistSession: false,
          },
        });
      },
    },
    SupabaseService,
  ],
  exports: [SUPABASE_CLIENT, SupabaseService],
})
export class SupabaseModule {}
