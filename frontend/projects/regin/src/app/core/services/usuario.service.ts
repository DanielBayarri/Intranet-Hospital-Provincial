import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../shared/environments/environments';
import { Observable } from 'rxjs';
import {
  CreateUsuarioInterface,
  UsuarioInterface,
} from '../../../../../shared/interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getUsuariosList(): Observable<UsuarioInterface[]> {
    return this.http.get<UsuarioInterface[]>(`${this.baseUrl}/api/usuarios`);
  }

  getUsuario(id: number): Observable<UsuarioInterface> {
    return this.http.get<UsuarioInterface>(
      `${this.baseUrl}/api/usuarios/${id}`
    );
  }

  createUsuario(usuario: CreateUsuarioInterface): Observable<UsuarioInterface> {
    const url = `${this.baseUrl}/api/usuarios`;

    return this.http.post<UsuarioInterface>(url, usuario);
  }
  patchUsuario(
    usuario: CreateUsuarioInterface,
    id: number
  ): Observable<UsuarioInterface> {
    const url = `${this.baseUrl}/api/usuarios/${id}`;

    return this.http.patch<UsuarioInterface>(url, usuario);
  }

  deleteUsuario(id: number): Observable<UsuarioInterface> {
    const url = `${this.baseUrl}/api/usuarios/${id}`;
    return this.http.delete<UsuarioInterface>(url);
  }
}
