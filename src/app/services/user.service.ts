import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Token } from '../interfaces/token.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUser$ = new BehaviorSubject<User | null>(null);
  httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    }),
  };

  constructor(private http: HttpClient) {}

  getUser(userId: string): Observable<User> {
    return this.http.get<User>(`http://localhost:3000/user/${userId}`);
  }

  changeUserNameAndPhone(user: { id: string; name: string; phone: string }) {
    return this.http.post(
      'http://localhost:3000/user/profile',
      user,
      this.httpOptions
    );
  }

  changeUserPassword(user: { id: string; password: string }) {
    return this.http.post(
      'http://localhost:3000/user/password',
      user,
      this.httpOptions
    );
  }

  verifyUser(body: Token) {
    return this.http.post(
      'http://localhost:3000/user/verifyJwt',
      body,
      this.httpOptions
    );
  }

  changeUserPicture(user: { id: string; picture: string }) {
    return this.http.post(
      'http://localhost:3000/user/profile/userPicture',
      user,
      this.httpOptions
    );
  }

  
}
