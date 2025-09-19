import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { ApiUsersResponse, User } from '../types/user';

@Injectable({ providedIn: 'root' })
export class UsersService {
  private readonly apiBase = 'https://peticiones.online/api';

  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<ApiUsersResponse>(`${this.apiBase}/users`)
      .pipe(map((resp) => resp.results));
  }

  getUserById(_id: string): Observable<User> {
    return this.http.get<User>(`${this.apiBase}/users/${_id}`);
  }

  createUser(payload: Omit<User, '_id'>): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/users`, payload);
  }

  updateUser(_id: string, payload: Partial<Omit<User, '_id'>>): Observable<User> {
    return this.http.put<User>(`${this.apiBase}/users/${_id}`, payload);
  }

  deleteUser(_id: string): Observable<unknown> {
    return this.http.delete(`${this.apiBase}/users/${_id}`);
  }
}
