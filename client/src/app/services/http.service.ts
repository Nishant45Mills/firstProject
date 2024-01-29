import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  post(url: any, payload: any) {

    return this.http.post(`${this.baseUrl}${url}`, payload);
  }
}
