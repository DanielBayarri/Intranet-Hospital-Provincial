import { Injectable } from '@angular/core';
import { environment } from '../../../../../shared/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleInterface } from '../../../../../shared/interfaces/role.interface';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getRolesList(): Observable<RoleInterface[]> {
    return this.http.get<RoleInterface[]>(`${this.baseUrl}/api/roles`);
  }

  getRole(id: number): Observable<RoleInterface> {
    return this.http.get<RoleInterface>(`${this.baseUrl}/api/roles/${id}`);
  }
}
