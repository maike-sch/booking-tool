import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RaumDTO {
  id: number;
  name: string;
  anzahlPlaetze: number;
  ausstattung: string;
}

export interface RaumCreateUpdateDTO {
  name: string;
  anzahlPlaetze: number;
  ausstattung: string;
}

@Injectable({ providedIn: 'root' })
export class RaumService {
  // Align with backend server.port=8089
  private readonly API = 'http://localhost:8089/raeume';

  constructor(private http: HttpClient) {}

  list(): Observable<RaumDTO[]> {
    return this.http.get<RaumDTO[]>(this.API);
  }

  get(id: number): Observable<RaumDTO> {
    return this.http.get<RaumDTO>(`${this.API}/${id}`);
  }

  create(dto: RaumCreateUpdateDTO): Observable<RaumDTO> {
    return this.http.post<RaumDTO>(this.API, dto);
  }

  update(id: number, dto: RaumCreateUpdateDTO): Observable<RaumDTO> {
    return this.http.put<RaumDTO>(`${this.API}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  verfuegbar(datum: string): Observable<RaumDTO[]> {
    const params = new URLSearchParams({ datum });
    return this.http.get<RaumDTO[]>(`${this.API}/verfuegbar?${params.toString()}`);
  }
}
