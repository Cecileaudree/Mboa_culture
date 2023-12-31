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

  // setIng4(){
  //   this.getListOfCategorie().subscribe((reponse:any)=>{
  //     const categories=reponse
  //     this.categoriebd={id:categories.data[0].id , nom_categorie:categories.data[0].Libelle_categorie,
  //       Image_categorie:categories.data[0].Image_categorie}
  //     this.storage.set("categorie",this.categoriebd)
  //   })

  //   this.getListOfQuestions().subscribe((reponse:any)=>{
  //     const question=reponse
  //     this.Question_bd={id:question[0].id ,Libelle_question:question[0].Libelle_question, is_active:question[0].is_active,
  //       niveaux_id:question[0].niveaux_id,categories_id:question[0].categories_id}
  //     this.storage.set("Question",this.Question_bd)
  //   })


  // }

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
