import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseHttpService<T> {

  BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient, entity: String) {
    this.BASE_URL += entity;
  }

  create(entityObj: T): Observable<T> {
    return this.http.post<T>(`${this.BASE_URL}`, entityObj);
  };

  findAll(): Observable<T[]> {
    return this.http.get<T[]>(`${this.BASE_URL}`);
  };

  findById(id: any): Observable<T> {
    return this.http.get<T>(`${this.BASE_URL}/${id}`);
  };

  update(id: any, entityObj: T): Observable<T> {
    return this.http.put<T>(`${this.BASE_URL}/${id}`, entityObj);
  };

  delete(id: any): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/${id}`)
  };



  addItemToMyList(entityObj: T, userId: string): Observable<T>{
    return this.http.post<T>(`${this.BASE_URL}/${userId}/myconfigs`, entityObj)
  };

  getMyList(userId: string): Observable<T[]>{
    return this.http.get<T[]>(`${this.BASE_URL}/${userId}/myconfigs`)
  };

  getMyItem(userId: string, itemId: string): Observable<T>{
    return this.http.get<T>(`${this.BASE_URL}/${userId}/myconfigs/${itemId}`)
  };

  updateMyItem(userId: string, itemId: string, entityObj: T): Observable<T>{
    return this.http.put<T>(`${this.BASE_URL}/${userId}/myconfigs/${itemId}`, entityObj)
  };

  deleteMyItem(userId: string, itemId: string): Observable<any>{
    return this.http.delete(`${this.BASE_URL}/${userId}/myconfigs/${itemId}`)
  };


}
