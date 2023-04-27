import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/config.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Category } from '../models/hardware.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  BASE_URL = environment.apiUrl;
  url: string = (this.BASE_URL += 'myconfigs');

  catUrl: string = '../../../../assets/categories.json';
  configs?: ConfigModel[];
  config!: ConfigModel;
  categories!: Category[];

  constructor(private http: HttpClient) {}

  create(newConfig: ConfigModel): Observable<ConfigModel> {
    return this.http.post(this.url, newConfig);
  }

  findAll(): Observable<ConfigModel[]> {
    return this.http
      .get(this.url)
      .pipe(map((configs) => (this.configs = Object.values(configs))));
  }

  findById(id: any): Observable<ConfigModel> {
    return this.http
      .get(`${this.url}/${id}`)
      .pipe(map((config) => (this.config = config)));
  }

  update(config: ConfigModel): Observable<ConfigModel> {
    return this.http.put<ConfigModel>(`${this.url}/${this.config._id}`, config);
  }

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
