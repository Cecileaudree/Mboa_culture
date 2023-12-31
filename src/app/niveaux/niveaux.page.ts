import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';


@Component({
  selector: 'app-niveaux',
  templateUrl: './niveaux.page.html',
  styleUrls: ['./niveaux.page.scss'],
})
export class NiveauxPage implements OnInit {

  constructor(private route:Router, private quiz:QuizService) { }

  categorie:any
  niveaux:any
  data:any

  ngOnInit() {
    const navigation = this.route.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.data = navigation.extras.state['datas'];
     }
     else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de score
      this.route.navigate(['/categories']);
    }

    console.log(this.data)

    this.quiz.getIng4("niveaux").then((reponse:any)=>{
      this.niveaux=reponse
    })

  }

  questionCatNiv(item:any){

   const datas={
      niv:item.id,
      cat:this.data.cat,
      nbre_joueur:parseInt(this.data.nbre_joueurs)
    }

    if( datas.nbre_joueur==1){
      this.route.navigate(['/quiz'], { state: {data:datas}} )
    }

    if(datas.nbre_joueur>1){
      this.route.navigate(['/quiz-p'], { state: {data:datas}} )
    }

  }

}
