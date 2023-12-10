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
  questions: any[] = [
    { question: 'Quelle est la capitale de la France?', options: ['Paris', 'Londres', 'Berlin', 'Rome'], correctAnswer: 'Paris' },
    { question: 'Combien de planètes y a-t-il dans notre système solaire?', options: ['7', '8', '9', '10'], correctAnswer: '8' },
    // Ajoutez d'autres questions ici
  ];

  data:any
  questionNiVCat:any[]=[]
  compteur=0
  PoseQuestion:any
  reponses:any[]=[]
  id_question:any
  score1=0
  taille:any

  // currentQuestion = 0;
  // score = 0;

  ngOnInit(): void {

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
      console.log(this.questionNiVCat)
      this.taille=this.questionNiVCat.length
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

  startQuiz() {
    // Changez la langue en fonction de la sélection de l'utilisateur
    this.translate.use('en');
    // Vous pouvez également changer la langue au fur et à mesure du quiz si nécessaire
  }



  // checkAnswer(answer: string) {
  //   if (answer === this.questions[this.currentQuestion].correctAnswer) {
  //     this.score++;
  //   }
  //   this.nextQuestion();
  // }







  onReponseClick(correct: any): void {

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
    }
    else {
      // L'utilisateur a terminé toutes les questions, vous pouvez ajouter une logique pour le rediriger vers une autre page, par exemple.
      const datas={
        taille:this.compteur+1,
        score:this.score1
      }
      this.route.navigate(['/result'], { state: { resulta: datas } });
    }

}










  // nextQuestion() {
  //   if (this.currentQuestion < this.questions.length - 1) {
  //     this.currentQuestion++;
  //   } else {
  //     // Quiz terminé, redirigez vers la page des résultats avec le score
  //     this.route.navigate(['/result'], { state: { score: this.score } });
  //   }
  // }











  // async LosingConnetion() {
  //   const toast = await this.toastController.create({
  //     message: 'Connexion Internet perdue.',
  //     duration: 3500,
  //     icon: 'planet-outline',
  //     color: 'danger',
  //     position: 'top',
  //   });

  //   await toast.present();
  // }

  // async GreatConnetion() {
  //   const toast = await this.toastController.create({
  //     message: 'Connexion à internet réétablie.',
  //     duration: 3500,
  //     icon: 'wifi-outline',
  //     color: 'success',
  //     position: 'top',
  //   });

  //   await toast.present();
  // }
}