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
  url: string = this.BASE_URL += "configs";

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
    return this.http.put<ConfigModel>(`${this.url}/${this.config.id}`, config)
  };

  delete(id: number | string): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
  };



  findCat(){
    return this.http.get(this.catUrl).pipe(
      map(categories => this.categories = Object.values(categories))
  )}
}



//! CONFIGS.JSON
// [
//   {
//   "case": {"name": "Case"}
//   },
//   {
//   "cpu": {"name": "CPU"}
//   },
//   {
//   "gpu": {"name": "GPU"}
//   },
//   {
//   "motherboard": {"name": "Motherboard"}
//   },
//   {
//   "monitor": {"name": "Monitor"}
//   },
//   {
//   "psu": {"name": "PSU"}
//   },
//   {
//   "ram": {"name": "RAM"}
//   },
//   {
//   "storage": {"name": "Storage"}
//   }
// ]

//* RESULT
// (8) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
// 0
// : 
// {case: {…}}
// 1
// : 
// {cpu: {…}}
// 2
// : 
// {gpu: {…}}
// 3
// : 
// {motherboard: {…}}
// 4
// : 
// {monitor: {…}}
// 5
// : 
// {psu: {…}}
// 6
// : 
// {ram: {…}}
// 7
// : 
// {storage: {…}}
// length
// : 
// 8
// [[Prototype]]
// : 
// Array(0)