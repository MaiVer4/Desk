import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models';
import { Observable, BehaviorSubject, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private http = inject(HttpClient);
  private API_URL = environment.API_URL;

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/login`, credentials)
    .pipe(
      tap((response) =>{
        this.saveSession(response)
      })
    );
  }

  register(credentials: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.API_URL}/auth/register`, credentials)
    .pipe(
      tap((response) =>{
        this.saveSession(response)
      })
    );
  }

  private currentUser$ = new BehaviorSubject<User | null>(null)

  private saveSession(response: AuthResponse): void {
    localStorage.setItem('accessToken', response.accessToken)
    localStorage.setItem('refreshToken', response.refreshToken)
    this.currentUser$.next(response.user)
  }

  private clearSession(): void {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    this.currentUser$.next(null)
  }

  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');

    return this.http.post(`${this.API_URL}/auth/logout`, { refreshToken}).pipe(
      finalize(() => {
        this.clearSession()
      })
    );
  }
}