import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanyPage } from './company';

@NgModule({
  declarations: [
    CompanyPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanyPage),
  ],
})
export class CompanyPageModule {}
