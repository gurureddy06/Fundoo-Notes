import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseurl: string = 'https://fundoonotes.incubation.bridgelabz.com/api/';
  constructor(private http: HttpClient) {}
  getApi(endPoint: string, headers: HttpHeaders) {
    let combinedUrl = this.baseurl + endPoint;
    return this.http.get(combinedUrl, { headers });
  }
  postApi(endPoint: string, body: any, headers: HttpHeaders) {
    let combinedUrl = this.baseurl + endPoint;

    return this.http.post(combinedUrl, (body = JSON.stringify(body)), {
      headers,
    });
  }
}
