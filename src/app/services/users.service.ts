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

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiBase}/users/${id}`);
  }

  createUser(payload: Omit<User, 'id'>): Observable<User> {
    return this.http.post<User>(`${this.apiBase}/users`, payload);
  }

  updateUser(id: number, payload: Partial<Omit<User, 'id'>>): Observable<User> {
    return this.http.put<User>(`${this.apiBase}/users/${id}`, payload);
  }

  deleteUser(id: number | string): Observable<unknown> {
    return this.http.delete(`${this.apiBase}/users/${id}`);
  }
}
