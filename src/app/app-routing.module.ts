import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "src/app/home/home.component";
import { CompanyListComponent } from "src/app/company-list/company-list.component";
import { ContactCreateComponent } from "src/app/contact-create/contact-create.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "home" },
  { path: "home", component: HomeComponent },
  { path: "contact-create", component: ContactCreateComponent },
  { path: "company-list", component: CompanyListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
