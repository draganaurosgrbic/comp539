import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/user/register`, user);
  }

  login(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/user/login`, user);
  }

}
