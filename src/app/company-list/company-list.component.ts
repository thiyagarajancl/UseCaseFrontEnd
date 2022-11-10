import { Component, OnInit } from '@angular/core';
import { Company } from '../model/Company';
import { CompanyService } from '../service/company.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  allCompany: Company[] = [];
  constructor(private companyService : CompanyService) { }
  GetCompanyDetails() {
    this.companyService.GetAllCompany().subscribe(response => {
      this.allCompany = response;
      console.log(this.allCompany);
    });
  }
  ngOnInit(): void {
    this.GetCompanyDetails();
  }

}
