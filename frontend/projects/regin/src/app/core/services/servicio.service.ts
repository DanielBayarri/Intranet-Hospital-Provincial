import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateServicioInterface,
  ServicioInterface,
} from '../../../../../shared/interfaces/servicio.interface';
import { environment } from '../../../../../shared/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class ServicioService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getServiciosList(): Observable<ServicioInterface[]> {
    return this.http.get<ServicioInterface[]>(`${this.baseUrl}/api/servicios`);
  }

  getServicioList(id: number): Observable<ServicioInterface> {
    return this.http.get<ServicioInterface>(
      `${this.baseUrl}/api/servicios/${id}`
    );
  }

  createServicio(
    servicio: CreateServicioInterface
  ): Observable<ServicioInterface> {
    const url = `${this.baseUrl}/api/servicios`;

    return this.http.post<ServicioInterface>(url, servicio);
  }
  patchServicio(
    servicio: CreateServicioInterface,
    id: number
  ): Observable<ServicioInterface> {
    const url = `${this.baseUrl}/api/servicios/${id}`;

    return this.http.patch<ServicioInterface>(url, servicio);
  }

  deleteServicio(id: number): Observable<ServicioInterface> {
    const url = `${this.baseUrl}/api/servicios/${id}`;
    return this.http.delete<ServicioInterface>(url);
  }
}
