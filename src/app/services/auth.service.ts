import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  url="https://mboaculture.ossu-technology.com/api"

  PostStudent(question:any){
    return this.http.post(this.url+'/questions/',question);
  }

  changerLangue(p:number) {
    // Changer de langue ici
    // if (this.langueDuTelephone === 'fr') {
    //   this.translate.use('en');
    // } else {
    //   this.translate.use('fr');
    // }

    console.log(p)
  }



}
