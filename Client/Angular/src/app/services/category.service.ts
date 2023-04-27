import { Injectable } from '@angular/core';
import { Category } from '../models/hardware.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: string[] | Category[] = ['Case', 'CPU', 'GPU', 'Motherboard', 'Monitor', 'PSU', 'RAM', 'Storage'];
  constructor() { }
}
