import { computed, effect, Injectable, signal } from '@angular/core';
import { createClient, OAuthResponse, Session } from '@supabase/supabase-js';
import { supabaseConfig } from '@config/supabase.config';

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
    }
  );
  private readonly sessionSignal = signal<Session | null>(null);
  public readonly user = computed(() => this.sessionSignal()?.user ?? null);
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

  public signInWithGoogle(): Promise<OAuthResponse> {
    const redirectTo = new URL(
      supabaseConfig.redirectPath,
      window.location.origin
    ).toString();
    return this.client.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo },
    });
  }

  public async handleCallbackFromUrl(currentUrl: string): Promise<Session> {
    const { data, error } = await this.client.auth.exchangeCodeForSession(
      currentUrl
    );
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
}
