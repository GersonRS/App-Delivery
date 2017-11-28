import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the CupomProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class CupomProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CupomProvider Provider');
  }

}
