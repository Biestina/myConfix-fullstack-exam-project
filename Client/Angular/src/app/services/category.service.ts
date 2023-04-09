import { Injectable } from '@angular/core';
import { Category } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  //TODO upper/lower debug
  categories: string[] | Category[] = ['Case', 'CPU', 'GPU', 'Motherboard', 'Monitor', 'PSU', 'RAM', 'Storage'];
  // categories: string[] | Category[] = ['case', 'cpu', 'gpu', 'motherboard', 'monitor', 'psu', 'ram', 'storage'];
  
  constructor() { }
}
