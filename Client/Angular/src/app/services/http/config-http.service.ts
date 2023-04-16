import { Injectable } from '@angular/core';
import { BaseHttpService } from './base-http.service';
import { HttpClient } from '@angular/common/http';
import { ConfigModel } from 'src/app/models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigHttpService extends BaseHttpService<ConfigModel> {

  constructor(http: HttpClient) {
    super(http, 'myconfigs')
   }
}
