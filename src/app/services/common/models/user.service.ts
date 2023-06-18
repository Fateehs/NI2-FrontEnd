import { User } from "src/app/entities/user";
import { HttpClientService } from "../http-client.service";
import { Create_User } from "src/app/contracts/operation-result/create_user_result";
import { Observable } from "rxjs/internal/Observable";
import { firstValueFrom } from "rxjs/internal/firstValueFrom";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClientService: HttpClientService) {}

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> =
      this.httpClientService.post<Create_User | User>(
        {
          controller: 'users',
        },
        user
      );

    return (await firstValueFrom(observable)) as Create_User;
  }
}
