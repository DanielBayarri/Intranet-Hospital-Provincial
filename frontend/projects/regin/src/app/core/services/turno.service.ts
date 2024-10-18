import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TurnoInterface } from '../../../../../shared/interfaces/turno.interface';
import { environment } from '../../../../../shared/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class TurnoService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTurnosList(): Observable<TurnoInterface[]> {
    return this.http.get<TurnoInterface[]>(`${this.baseUrl}/api/turnos`);
  }

  getTurno(id: number): Observable<TurnoInterface> {
    return this.http.get<TurnoInterface>(`${this.baseUrl}/api/turnos/${id}`);
  }
}
