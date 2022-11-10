import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticatedResponse } from '../model/AuthenticatedResponse';
import { Userlogin } from '../model/Userlogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //credentials : Userlogin = {userName:'thiyagarajan',password:'123456'};
  baseUrl = "https://localhost:7108/validate";
  constructor(private httpclient: HttpClient) { }
  GetAuthToken(): Observable<AuthenticatedResponse> {
    let headers_obj = new HttpHeaders();
    headers_obj.set('Content-Type', 'application/json utf-8');
    const credentials = { userName: 'thiyagarajan', password: '123456' };
    return this.httpclient.post<AuthenticatedResponse>(this.baseUrl, credentials, { headers: headers_obj });
  }
}
