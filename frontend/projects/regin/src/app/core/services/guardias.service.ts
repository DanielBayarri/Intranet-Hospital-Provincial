import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../shared/environments/environments';
import { Observable } from 'rxjs';
import {
  CrearGuardiaLocalizadaInterface,
  GuardiaLocalizadaInterface,
} from '../../../../../shared/interfaces/guardia.interface';

@Injectable({
  providedIn: 'root',
})
export class GuardiaLocalizadaService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getGuardiasList(): Observable<GuardiaLocalizadaInterface[]> {
    return this.http.get<GuardiaLocalizadaInterface[]>(
      `${this.baseUrl}/api/guardias-localizadas`
    );
  }

  getGuardia(id: number): Observable<GuardiaLocalizadaInterface> {
    return this.http.get<GuardiaLocalizadaInterface>(
      `${this.baseUrl}/api/guardias-localizadas/${id}`
    );
  }

  createGuardia(
    guardia: CrearGuardiaLocalizadaInterface
  ): Observable<GuardiaLocalizadaInterface> {
    const url = `${this.baseUrl}/api/guardias-localizadas`;

    return this.http.post<GuardiaLocalizadaInterface>(url, guardia);
  }
}
