import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = 'localhost:3000';

  syncData(data) {
    const headers = new HttpHeaders({
      'Content-type': 'application/json;',
    });
    return this.http.post(this.baseUrl + '/sync', data, {headers});
  }
}
