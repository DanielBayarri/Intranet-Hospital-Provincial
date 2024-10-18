import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../shared/environments/environments';
import {
  CreateSubtipoInterface,
  SubtipoInterface,
} from '../../../../../shared/interfaces/subtipo.interface';

@Injectable({
  providedIn: 'root',
})
export class SubtipoService {
  private readonly baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  getSubtiposList(): Observable<SubtipoInterface[]> {
    return this.http.get<SubtipoInterface[]>(`${this.baseUrl}/api/subtipos`);
  }

  getSubtipo(id: number): Observable<SubtipoInterface> {
    return this.http.get<SubtipoInterface>(
      `${this.baseUrl}/api/subtipos/${id}`
    );
  }

  createSubtipo(subtipo: CreateSubtipoInterface): Observable<SubtipoInterface> {
    const url = `${this.baseUrl}/api/subtipos`;

    return this.http.post<SubtipoInterface>(url, subtipo);
  }

  patchSubtipo(
    subtipo: CreateSubtipoInterface,
    id: number
  ): Observable<SubtipoInterface> {
    const url = `${this.baseUrl}/api/subtipos/${id}`;

    return this.http.patch<SubtipoInterface>(url, subtipo);
  }

  deleteSubtipo(id: number): Observable<SubtipoInterface> {
    const url = `${this.baseUrl}/api/subtipos/${id}`;
    return this.http.delete<SubtipoInterface>(url);
  }
}
