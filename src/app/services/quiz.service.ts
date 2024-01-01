import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from '@ionic/storage'
import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient, private storage:Storage) { }

  url="https://mboaculture.ossu-technology.com/api"

  getListOfCategorie(){
    return this.http.get( this.url+"/categories")
  }

  getListOfNiveau(){
    return this.http.get( this.url+"/niveaux")
  }

  getListOfQuestions(){
    return this.http.get( this.url+"/questions")
  }

  getListOfReponses(){
    return this.http.get( this.url+"/reponses")
  }

  async createDatabase(){ 
    await this.storage.create();
    await this.storage.defineDriver(cordovaSQLiteDriver);
  }

  categoriebd:any
  Question_bd:any


  suppIng4(table:string){
    this.storage.remove(table);
  }

  getIng4(table:string):Promise <any>{
    return this.storage.get(table);
  }

  async addIng4(table:string, object:any){
   let etud:any[]=[]
   const rep = await this.getIng4(table);
   etud= rep ?rep:[];
   etud.push(object)
   this.storage.set(table,etud)
  }
}
