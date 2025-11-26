import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';

interface AuthResponse { token: string }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly API = 'http://localhost:8089';
  private readonly TOKEN_KEY = 'jwt_token';

  private _role$ = new BehaviorSubject<string | null>(this.getRole());
  role$ = this._role$.asObservable();

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<AuthResponse>(`${this.API}/auth/login`, { username, password }).pipe(
      tap(res => {
        localStorage.setItem(this.TOKEN_KEY, res.token);
        this._role$.next(this.getRole());
      })
    );
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this._role$.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      return !exp || Date.now() < exp * 1000;
    } catch {
      return false;
    }
  }

  getRole(): string | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  hasRole(role: string): boolean {
    return this.getRole() === role;
  }
}
