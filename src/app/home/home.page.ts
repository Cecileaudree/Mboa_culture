import { Component } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'




@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor( public actionSheetController:ActionSheetController,
                private router:Router,private quiz:QuizService,
                private storage:Storage) {}

    loading = true
    listCategorie:any[]=[]
    listQuestion:any[]=[]
    listNiveaux:any[]=[]
    listReponses:any[]=[]
    niveauxbd:any
    categoriebd:any
    questiondb:any
    reponsesbd:any

  async ngOnInit() {
      this.initialize_bd()
  }

  async startFunction() {
    this.router.navigate(['/categories'])
  }

  async presentActionSheet(){
    const actionSheet=await this.actionSheetController.create({
      header:'albums',
      buttons:[
        {text:'save',
        role:'save',
        icon:'grid-outline',

      },
        {text:'delete'},
        {text:'always'}],

    });

    await actionSheet.present();

    const{role}=await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role)

   }

  async initialize_bd(){
     const is_initialize= await this.storage.get("is_initialize")
    if(!is_initialize){
      this.quiz.suppIng4("categorie")
      this.quiz.suppIng4("Question")
      this.quiz.suppIng4("niveaux")

      this.quiz.getListOfCategorie().subscribe((reponse:any)=>{
        const categorie= reponse
        console.log(categorie.data.length)

        for(let i=0; i< reponse.data.length; i++){
           this.categoriebd={id:categorie.data[i].id ,nom_categorie:categorie.data[i].Libelle_categorie,
            Image_categorie:categorie.data[i].Image_categorie}
           this.listCategorie.push(this.categoriebd)
           console.log()
           //this.quiz.addIng4("categorie",this.listCategorie)
        }
        console.log(this.listCategorie)
        this.storage.set("categorie",this.listCategorie)
      //const categoriebd=[{id:categorie[0].id}]
      //console.log(this.categoriebd)
      })

      this.quiz.getListOfQuestions().subscribe((reponse:any)=>{
        const question= reponse
        console.log(question)

        for(let i=0; i< question.length; i++){
           this.questiondb={id:question[i].id ,Libelle_question:question[i].Libelle_question, is_active:question[i].is_active,
            niveaux_id:question[i].niveaux_id,categories_id:question[i].categories_id}
           this.listQuestion.push(this.questiondb)
           //this.quiz.addIng4("Question",this.listQuestion)
        }
        this.storage.set("Question",this.listQuestion)
      //const categoriebd=[{id:categorie[0].id}]
      //console.log(this.questiondb)
      })

      this.quiz.getListOfNiveau().subscribe((reponse:any)=>{
        const niveaux= reponse
        console.log(niveaux)

        for(let i=0; i< niveaux.length; i++){
           this.niveauxbd={id:niveaux[i].id ,Libelle_niveau:niveaux[i].Libelle_niveau}
           this.listNiveaux.push(this.niveauxbd)
           //this.quiz.addIng4("Question",this.listQuestion)
        }
        this.storage.set("niveaux",this.listNiveaux)
      //const categoriebd=[{id:categorie[0].id}]
      //console.log(this.questiondb)
      })

      this.quiz.getListOfReponses().subscribe((reponse:any)=>{
        const reponses= reponse
        console.log(reponses)

        for(let i=0; i< reponses.length; i++){
           this.reponsesbd={id:reponses[i].id ,choix:reponses[i].choix,est_correct:reponses[i].est_correct,
            points:reponses[i].points,questions_id:reponses[i].questions_id}
           this.listReponses.push(this.reponsesbd)
           //this.quiz.addIng4("Question",this.listQuestion)
        }
        this.storage.set("reponses",this.listReponses)
      //const categoriebd=[{id:categorie[0].id}]
      //console.log(this.questiondb)
      })
      await this.storage.set("is_initialize",true)
    }

  }



}
