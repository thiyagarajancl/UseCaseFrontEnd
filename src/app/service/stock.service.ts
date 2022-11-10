import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Stock } from 'src/app/model/Stock';
import { AuthService } from './auth.service';
import { AuthenticatedResponse } from '../model/AuthenticatedResponse';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  authresponse!: AuthenticatedResponse;

  constructor(private httpclient: HttpClient) { }
  GetStockDetails(id: string, startDate: string, endDate: string): Observable<Stock[]> {

    const token = sessionStorage.getItem("jwt");
    let headers_obj = new HttpHeaders().set("Authorization", "Bearer " + token);
    headers_obj.set('Content-Type', 'application/json utf-8');
    let code = id;
    let startdate = startDate;
    let enddate = endDate;
    let baseUrl = `https://localhost:7063/api/v/1.0/market/stock/get/${code}/${startdate}/${enddate}`;
    return this.httpclient.get<Stock[]>(baseUrl, { headers: headers_obj });
  }
}
