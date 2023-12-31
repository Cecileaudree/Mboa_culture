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
  nbre_joueurs:any

  ngOnInit() {

    const navigation = this.route.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.nbre_joueurs = navigation.extras.state['joueurs'];
    } else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de score
      this.route.navigate(['/quiz']);
    }

    console.log(this.nbre_joueurs)
    this.quiz.getIng4("categorie").then((reponse)=>{
      this.categories=reponse
      console.log(this.categories)
      console.log(reponse)
    })
  }

  niveaux(item:any){
    const data={
      nbre_joueurs:this.nbre_joueurs,
      cat:item.id
    }
    this.route.navigate(['/niveaux'], { state: { datas: data} })
  }

}
