import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { D3 } from '../models/D3';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  dataUrl: string = 'http://localhost:3000/budget';
  constructor(private http: HttpClient) {}

  // get D3 Data
  getChartData(): Observable<D3[]> {
    return this.http.get<D3[]>(this.dataUrl);
  }
}
