import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';

type SaveKeyPayload = {
  apiKey: string;
  label?: string | null;
  provider?: string | null;
};

export type ApiKeyRow = {
  id: string;
  provider: string;
  label: string | null;
  createdAt: string;
  updatedAt: string;
};

@Injectable({ providedIn: 'root' })
export class ApiKeysService {
  private readonly http = inject(HttpClient);
  private readonly auth = inject(AuthService);
  private readonly baseUrl = '/api/api-keys';

  private async authHeaders(): Promise<HttpHeaders> {
    await this.auth.ready();
    const token = await this.auth.getAccessToken();
    if (!token) {
      throw new Error('You must be signed in to manage API keys.');
    }
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  async list(): Promise<ApiKeyRow[]> {
    const headers = await this.authHeaders();
    return firstValueFrom(this.http.get<ApiKeyRow[]>(this.baseUrl, { headers }));
  }

  async saveKey(payload: SaveKeyPayload): Promise<void> {
    const headers = await this.authHeaders();
    await firstValueFrom(this.http.post(this.baseUrl, payload, { headers }));
  }

  async rename(id: string, label: string): Promise<void> {
    const headers = await this.authHeaders();
    await firstValueFrom(
      this.http.patch(`${this.baseUrl}/${id}`, { label }, { headers }),
    );
  }

  async delete(id: string): Promise<void> {
    const headers = await this.authHeaders();
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/${id}`, { headers }),
    );
  }
}
