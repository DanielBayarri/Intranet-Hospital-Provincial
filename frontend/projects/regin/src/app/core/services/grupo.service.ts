import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CreateGrupoInterface,
  GrupoInterface,
  GrupoListInterface,
} from '../../../../../shared/interfaces/grupo.interface';
import { environment } from '../../../../../shared/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class GrupoService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getGrupoList(): Observable<GrupoListInterface[]> {
    return this.http.get<GrupoInterface[]>(`${this.baseUrl}/api/grupos`);
  }

  getGrupo(id: number): Observable<GrupoInterface> {
    return this.http.get<GrupoInterface>(`${this.baseUrl}/api/grupos/${id}`);
  }

  createGrupo(grupo: CreateGrupoInterface): Observable<GrupoInterface> {
    const url = `${this.baseUrl}/api/grupos`;

    return this.http.post<GrupoInterface>(url, grupo);
  }
  patchGrupo(
    grupo: CreateGrupoInterface,
    id: number
  ): Observable<GrupoInterface> {
    const url = `${this.baseUrl}/api/grupos/${id}`;

    return this.http.patch<GrupoInterface>(url, grupo);
  }

  deleteGrupo(id: number): Observable<GrupoInterface> {
    const url = `${this.baseUrl}/api/grupos/${id}`;
    return this.http.delete<GrupoInterface>(url);
  }
}
