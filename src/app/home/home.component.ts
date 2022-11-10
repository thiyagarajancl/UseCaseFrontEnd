import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Company } from '../model/Company';
import { Stock } from '../model/Stock';
import { CompanyService } from '../service/company.service';
import { StockService } from '../service/stock.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  selectedCompanyCode = "";
  selectedCompanyName = "";
  allCompany: Company[] = [];
  allStock: Stock[] = [];
  fromDate = "";
  toDate = "";
  obj = {
    Minimum: 0,
    Maximum: 0,
    Average: 0,
    CompanyName : ""
  }
  constructor(private companyService: CompanyService, private stockService: StockService) { }
  GetCompanyDetails() {
    this.companyService.GetAllCompany().subscribe(response => {
      this.allCompany = response;
      console.log(this.allCompany);
    });
  }
  triggerFromDateFilter(evt: any) {
    let year = evt.year;
    let month = evt.month;
    let day = evt.day;
    this.fromDate = year + "-" + month + "-" + day;
  }

  triggerToDateFilter(evt: any) {
    let year = evt.year;
    let month = evt.month;
    let day = evt.day;
    this.toDate = year + "-" + month + "-" + day;
  }
  ngOnInit(): void {
    this.GetCompanyDetails();
  }
  onselectCompany(event: Event) {
    this.selectedCompanyCode = (event.target as HTMLInputElement).value;
    this.selectedCompanyName = (event.target as HTMLInputElement).title;
    console.log(event);
    this.obj.CompanyName = this.selectedCompanyName;
  }
  getStockData() {
    this.stockService.GetStockDetails(this.selectedCompanyCode, this.fromDate, this.toDate).subscribe(result => {
      this.allStock = result;
      this.obj.Minimum = Math.min.apply(Math, this.allStock.map(v => v.stockPrice));
      this.obj.Maximum = Math.max.apply(Math, this.allStock.map(v => v.stockPrice));
      this.obj.Average = this.allStock.map(v => v.stockPrice).reduce((a, b) => a + b, 0) / this.allStock.length;
      console.log("Minimum " + Math.min.apply(Math, this.allStock.map(v => v.stockPrice)));
      console.log("Average " + this.allStock.map(v => v.stockPrice).reduce((a, b) => a + b, 0) / this.allStock.length);
      console.log("Maximum " + Math.max.apply(Math, this.allStock.map(v => v.stockPrice)));
    });
    return false;
  }
}