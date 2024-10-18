import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../shared/environments/environments';
import {
  CreateTipoInterface,
  TipoInterface,
} from '../../../../../shared/interfaces/tipo.interface';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getTiposList(): Observable<TipoInterface[]> {
    return this.http.get<TipoInterface[]>(`${this.baseUrl}/api/tipos`);
  }

  getTipo(id: number): Observable<TipoInterface> {
    return this.http.get<TipoInterface>(`${this.baseUrl}/api/tipos/${id}`);
  }

  createTipo(tipo: CreateTipoInterface): Observable<TipoInterface> {
    const url = `${this.baseUrl}/api/tipos`;

    return this.http.post<TipoInterface>(url, tipo);
  }
  patchTipo(tipo: CreateTipoInterface, id: number): Observable<TipoInterface> {
    const url = `${this.baseUrl}/api/tipos/${id}`;

    return this.http.patch<TipoInterface>(url, tipo);
  }

  deleteTipo(id: number): Observable<TipoInterface> {
    const url = `${this.baseUrl}/api/tipos/${id}`;
    return this.http.delete<TipoInterface>(url);
  }
}
