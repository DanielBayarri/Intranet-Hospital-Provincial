import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CrearIncidenciaInterface,
  IncidenciaInterface,
} from '../../../../../shared/interfaces/incidencia.interface';
import { environment } from '../../../../../shared/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class IncidenciaService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getIncidenciasList(): Observable<IncidenciaInterface[]> {
    return this.http.get<IncidenciaInterface[]>(
      `${this.baseUrl}/api/incidencias`
    );
  }

  getIncidencia(id: number): Observable<IncidenciaInterface> {
    return this.http.get<IncidenciaInterface>(
      `${this.baseUrl}/api/incidencias/${id}`
    );
  }

  createIncidencia(
    incidencia: CrearIncidenciaInterface
  ): Observable<IncidenciaInterface> {
    const url = `${this.baseUrl}/api/incidencias`;

    return this.http.post<IncidenciaInterface>(url, incidencia);
  }
}
