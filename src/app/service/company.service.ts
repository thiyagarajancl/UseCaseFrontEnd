import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from 'src/app/model/Company';
import { AuthService } from './auth.service';
import { AuthenticatedResponse } from '../model/AuthenticatedResponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  authresponse!: AuthenticatedResponse;
  baseUrl = "https://localhost:7063/api/v1.0/market/company/getall";
  constructor(private httpclient: HttpClient, private authService: AuthService) { }
  GetAllCompany(): Observable<Company[]> {
    this.authService.GetAuthToken().subscribe(response => {
      this.authresponse = response;
      if(!this.authresponse.isAuthenticated){
        console.log('token is not valid');
      }
      else{
        sessionStorage.setItem("jwt", this.authresponse.token);
      }
    });
    const token = sessionStorage.getItem("jwt");
    let headers_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    return this.httpclient.get<Company[]>(this.baseUrl, { headers: headers_obj });
  }
}
