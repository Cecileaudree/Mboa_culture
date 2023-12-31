import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-quiz',
  templateUrl: 'quiz.page.html',
  styleUrls: ['quiz.page.scss'],
})
export class QuizPage {
  constructor(private route: Router, private translate: TranslateService, private quiz:QuizService){
    //this.translate.setDefaultLang('en'); // Langue par défaut
   // this.translate.use('en');
  }

  data:any
  questionNiVCat:any[]=[]
  compteur=0
  PoseQuestion:any
  reponses:any[]=[]
  id_question:any
  score1=0
  taille:any
  progression=0

  // currentQuestion = 0;
  // score = 0;

  ngOnInit(): void {
    this.score1=0
    this.translate.use('en');
      // Récupérer la traduction pour la clé 'QUIZ_TITLE'
      // this.translate.get('QUIZ_TITLE').subscribe((translation: string) => {
      //   console.log('Traduction pour QUIZ_TITLE :', translation);
      // });

    const navigation = this.route.getCurrentNavigation();

    if (navigation?.extras && navigation.extras.state) {
      this.data = navigation.extras.state['data'];
    }
    else {
      // Redirigez l'utilisateur vers la page du quiz s'il n'y a pas de niveaux
      this.route.navigate(['/niveaux']);
    }

    console.log(this.data)

    this.quiz.getIng4("Question").then((reponse:any)=>{
      for(let i=0; i< reponse.length; i++ ){
        if(reponse[i].niveaux_id == this.data.niv && reponse[i].categories_id == this.data.cat){
          this.questionNiVCat.push(reponse[i])
        }
      }
      //console.log(this.questionNiVCat)
      this.taille=this.questionNiVCat.length
      this.questionNiVCat = this.aleatoire(this.questionNiVCat);
      this.PoseQuestion=this.questionNiVCat[this.compteur].Libelle_question
      this.id_question=this.questionNiVCat[this.compteur].id


      // while(this.compteur< this.questionNiVCat.length){
        this.quiz.getIng4("reponses").then((reponse:any)=>{
        //console.log(reponse)
        for(let i=0; i< reponse.length; i++){
          if(reponse[i].questions_id == this.id_question){
            this.reponses.push(reponse[i])
          }
        }
        console.log(this.reponses)
      })

      //}


      //console.log(this.PoseQuestion)


    })

  }

  aleatoire(questions: any[]): any[]{
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  }

  startQuiz() {
    // Changez la langue en fonction de la sélection de l'utilisateur
    this.translate.use('en');
    // Vous pouvez également changer la langue au fur et à mesure du quiz si nécessaire
  }




  onReponseClick(correct: any): void {
    console.log(correct.est_correct)
    if(correct.est_correct="vraie"){
      this.score1=correct.points+this.score1
      
    }

    if (this.compteur < this.questionNiVCat.length - 1) {
      this.compteur++;
      this.id_question = this.questionNiVCat[this.compteur].id;
      this.PoseQuestion = this.questionNiVCat[this.compteur].Libelle_question;

      this.reponses = [];

      this.quiz.getIng4("reponses").then((reponse: any) => {
        for (let i = 0; i < reponse.length; i++) {
          if (reponse[i].questions_id == this.id_question) {
            this.reponses.push(reponse[i]);
          }
        }
        console.log(this.reponses);
      });
      this.miseAJourProgression();
    }
    else {
      // L'utilisateur a terminé toutes les questions, vous pouvez ajouter une logique pour le rediriger vers une autre page, par exemple.
      const datas={
        taille:this.compteur+1,
        score:this.score1
      }
      this.route.navigate(['/resulta-p'], { state: { resulta: datas } });
    }

}


miseAJourProgression() {
  this.progression = (this.compteur + 1) / this.questionNiVCat.length;
}




}
