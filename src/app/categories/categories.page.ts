import { Component, OnInit } from '@angular/core';
import { QuizService } from '../services/quiz.service';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

  constructor( private quiz:QuizService, private navCtr:NavController,private route:Router) { }

  categories:any[]=[]

  ngOnInit() {
    this.quiz.getIng4("categorie").then((reponse)=>{
      this.categories=reponse
      console.log(this.categories)
      console.log(reponse)
    })
  }

  niveaux(item:any){
    this.route.navigate(['/niveaux'], { state: { catgorie: item.id} })
  }

}
