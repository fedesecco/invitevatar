import { computed, effect, Injectable, signal } from '@angular/core';
import { supabaseConfig, supabaseTables } from '@app/shared/constants';
import { createClient, OAuthResponse, Session } from '@supabase/supabase-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly client = createClient(
    supabaseConfig.url,
    supabaseConfig.anonKey,
    {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    },
  );
  private readonly sessionSignal = signal<Session | null>(null);
  public readonly user = computed(() => this.sessionSignal()?.user ?? null);
  public readonly displayName = computed(() => {
    const user = this.sessionSignal()?.user;
    if (!user) return null;
    const metadata = user.user_metadata ?? {};
    const fullName =
      (metadata['full_name'] as string | undefined) ??
      (metadata['name'] as string | undefined);
    if (fullName && fullName.trim()) return fullName;
    return user.email ?? null;
  });
  public readonly isAuthenticated = computed(() => !!this.user());
  private readonly readyPromise: Promise<void>;

  constructor() {
    this.readyPromise = this.bootstrapSession();

    // Keep local state in sync with auth events.
    effect((onCleanup) => {
      const { data } = this.client.auth.onAuthStateChange((_, session) => {
        this.sessionSignal.set(session);
      });
      onCleanup(() => data.subscription.unsubscribe());
    });

    // Ensure a profile row exists/updates whenever auth changes.
    effect(() => {
      const user = this.user();
      if (!user) return;
      this.upsertProfile(user).catch((error) =>
        console.error('Failed to sync profile', error),
      );
    });
  }

  private async bootstrapSession(): Promise<void> {
    const { data, error } = await this.client.auth.getSession();
    if (!error) {
      this.sessionSignal.set(data.session);
    }
  }

  public async ready(): Promise<void> {
    await this.readyPromise;
  }

  public async getAccessToken(): Promise<string | null> {
    await this.ready();
    const current = this.sessionSignal();
    if (current?.access_token) return current.access_token;

    const { data, error } = await this.client.auth.getSession();
    if (error) {
      console.error('Failed to fetch session', error);
      return null;
    }
    this.sessionSignal.set(data.session);
    return data.session?.access_token ?? null;
  }

  public signInWithGoogle(): Promise<OAuthResponse> {
    const redirectTo = new URL(
      supabaseConfig.redirectPath,
      window.location.origin,
    ).toString();
    return this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
  }

  public async handleCallbackFromUrl(currentUrl: string): Promise<Session> {
    const { data, error } =
      await this.client.auth.exchangeCodeForSession(currentUrl);
    if (error) throw error;
    this.sessionSignal.set(data.session);
    return data.session;
  }

  public async signOut(): Promise<void> {
    const { error } = await this.client.auth.signOut();
    if (error) throw error;
    this.sessionSignal.set(null);
  }

  get supabase() {
    return this.client;
  }

  private async upsertProfile(user: {
    id: string;
    email?: string | null;
    user_metadata?: Record<string, unknown>;
  }) {
    const displayName =
      (user.user_metadata?.['full_name'] as string | undefined) ??
      (user.email ? user.email.split('@')[0] : '');
    const { error } = await this.client
      .from(supabaseTables.profiles)
      .upsert(
        {
          id: user.id,
          email: user.email ?? '',
          display_name: displayName ?? '',
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' },
      );
    if (error) throw error;
  }
}
