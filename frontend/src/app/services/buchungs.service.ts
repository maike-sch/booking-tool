import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface BuchungDTO {
  id: number;
  raumId: number;
  raumName: string;
  user: string;
  startZeit: string; // ISO
  endZeit: string;   // ISO
}

export interface BuchungCreateDTO {
  raumId: number;
  startZeit: string; // ISO
  endZeit: string;   // ISO
}

@Injectable({ providedIn: 'root' })
export class BuchungsService {
  private readonly API = 'http://localhost:8080/buchungen';

  constructor(private http: HttpClient) {}

  create(dto: BuchungCreateDTO): Observable<BuchungDTO> {
    return this.http.post<BuchungDTO>(this.API, dto).pipe(
      catchError((err: HttpErrorResponse) => throwError(() => err))
    );
  }

  myBookings(): Observable<BuchungDTO[]> {
    return this.http.get<BuchungDTO[]>(`${this.API}/user`);
  }
}
