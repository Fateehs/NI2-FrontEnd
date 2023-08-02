import { Observable, firstValueFrom } from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor(private httpClientService: HttpClientService) {}

  async login(
    username: string,
    password: string,
    callBackFunction?: () => void
  ): Promise<any> {
    const observable: Observable<TokenResponse> = this.httpClientService.post<
      any | TokenResponse
    >(
      {
        controller: 'auth',
        action: 'login',
      },
      { username, password }
    );

    const tokenResponse: TokenResponse = (await firstValueFrom(
      observable
    )) as TokenResponse;

    if (tokenResponse) {
      localStorage.setItem('accessToken', tokenResponse.token.accessToken);
      localStorage.setItem('refreshToken', tokenResponse.token.refreshToken);
    }
    callBackFunction();
  }
}
