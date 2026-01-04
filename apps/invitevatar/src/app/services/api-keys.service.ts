import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

type SaveKeyPayload = {
  apiKey: string;
  label?: string | null;
  provider?: string | null;
};

@Injectable({ providedIn: 'root' })
export class ApiKeysService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly baseUrl = '/api/api-keys';

  async saveKey(payload: SaveKeyPayload): Promise<void> {
    await this.auth.ready();
    const token = await this.auth.getAccessToken();
    if (!token) {
      throw new Error('You must be signed in to save an API key.');
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    await firstValueFrom(
      this.http.post(this.baseUrl, payload, {
        headers,
      }),
    );
  }
}
