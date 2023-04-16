import { Injectable } from '@angular/core';
import { ConfigModel } from '../models/config.model';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Category } from '../models/hardware.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // url: string = '../../../../assets/configs.json';
  // url: string = 'http://localhost:3000/configs';
  BASE_URL = environment.apiUrl;
  // url: string = this.BASE_URL += "configs";
  url: string = this.BASE_URL += "myconfigs";

  catUrl: string = '../../../../assets/categories.json';
  configs?: ConfigModel[];
  config!: ConfigModel;
  categories!: Category[];

  constructor(private http: HttpClient) { }
  
  create(newConfig: ConfigModel): Observable<ConfigModel> {
    return this.http.post(this.url, newConfig);
  };

  findAll(): Observable<ConfigModel[]> {
    return this.http.get(this.url).pipe(
      map(configs => this.configs = Object.values(configs)),
      // tap(configs => console.log(this.configs))
    );
  };

  findById(id: any): Observable<ConfigModel> {
    return this.http.get(`${this.url}/${id}`).pipe(
      map(config => this.config = config),
      // tap(config => console.log(this.config))
    )
  };

  // update(id: any): Observable<ConfigModel> {
  update(config: ConfigModel): Observable<ConfigModel> {
    // return this.http.put<ConfigModel>(`${this.url}/${id}`, id)
    return this.http.put<ConfigModel>(`${this.url}/${this.config._id}`, config)
  };

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  };



  findCat(){
    return this.http.get(this.catUrl).pipe(
      map(categories => this.categories = Object.values(categories))
  )}
}