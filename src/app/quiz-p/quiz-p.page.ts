import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { QuizService } from '../services/quiz.service';
import { Joueur } from '../model/joueurs';
import { AlertController, ToastController } from '@ionic/angular';


@Component({
  selector: 'app-quiz-p',
  templateUrl: './quiz-p.page.html',
  styleUrls: ['./quiz-p.page.scss'],
})
export class QuizPPage implements OnInit {

  constructor(private route: Router, private translate: TranslateService, private quiz:QuizService,
              private alertController: AlertController, private toastController: ToastController){
    //this.translate.setDefaultLang('en'); // Langue par défaut
   // this.translate.use('en');
  }

  data:any
  private minuterie: any;
  questionNiVCat:any[]=[]
  compteur=0
  PoseQuestion:any
  reponses:any[]=[]
  id_question:any
  score1=0
  taille:any
  currentPlayerIndex = 0
  joueurs:Joueur[]=[]
  joueurActuel:Joueur | any
  progression=0
  tempsRestant: number=120;
  private tempsParQuestion = 120; // en secondes

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

    this.createPlayers(this.data.nbre_joueur)
    this.joueurActuel=this.joueurs[this.currentPlayerIndex]
    this.afficherMessageJoueurActuel()

    this.Question()
    this.lancerMinuterie();
    this.getProgressBarColor();


  }

  async afficherMessageJoueurActuel() {
    if (this.joueurActuel) {
      const alert = await this.alertController.create({
        cssClass: 'custom-multi-joueurs-alert',
        // header: 'C\'est à toi de jouer !',
        subHeader: `C'est à toi de jouer ${this.joueurActuel.nom}.`,
        buttons: [
          // {
          //   text: 'Annuler',
          //   cssClass: 'alert-button-cancel',

          // },
          {
            text: 'OK',
            cssClass: 'alert-button-confirm',

          },
        ],
      });

      await alert.present();
    }
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


  onReponseClick(correct: any, j:Joueur): void {
    this.reinitialiserMinuterie();
    if(correct.est_correct="vraie"){
      //this.score1=correct.points+this.score1
      console.log(j)
      j.points=correct.points+j.points
      console.log(j.points)
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
      this.lancerMinuterie();
      this.miseAJourProgression();

    }
    else if(this.compteur == this.questionNiVCat.length -1 && this.currentPlayerIndex<this.joueurs.length-1){

      this.currentPlayerIndex++
      //this.Question()
      this.compteur=0
      console.log(this.currentPlayerIndex)
      this.joueurActuel=this.joueurs[this.currentPlayerIndex]
      this.afficherMessageJoueurActuel()
      this.progression=0
      // this.onReponseClick()
    }
    else {
      // L'utilisateur a terminé toutes les questions, vous pouvez ajouter une logique pour le rediriger vers une autre page, par exemple.
      const datas={
        taille:this.compteur+1,
        jF:this.joueurs
      }
      this.currentPlayerIndex = 0
      this.route.navigate(['/result'], { state: { resulta: datas } });
    }

}

  Question(){
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

  async createPlayers(nombre: number) {
    for (let i = 0; i < nombre; i++) {
      const nomJoueur = await this.askForPlayerName(i + 1);
      this.joueurs.push({ nom: nomJoueur, points: 0 });
    }

    console.log('Joueurs créés :', this.joueurs);
    this.joueurActuel = this.joueurs[this.currentPlayerIndex];
    this.afficherMessageJoueurActuel()
  }

  async askForPlayerName(index: number): Promise<string> {
    const loading = await this.alertController.create({
      cssClass: 'custom-multi-joueurs-alert',
      message: `Entrez le nom du joueur ${index}`,
      backdropDismiss: false,
      keyboardClose: false,
      inputs: [
        {
          name: 'nomJoueur',
          type: 'text',
          placeholder: 'Nom du joueur',
        }
      ],
      buttons: [
        // {
        //   text: 'Annuler',
        //   cssClass: 'alert-button-cancel',
        //   handler: () => {
        //     console.log('Annulé');
        //   },
        // },
        {
          text: 'OK',
          cssClass: 'alert-button-confirm',
          handler: (data) => {
            return data.nomJoueur.trim();
          },
        },
      ],
    });

    await loading.present();

    return loading.onDidDismiss().then((data) => {
      return data.data.values.nomJoueur.trim();
    });
  }

  private reinitialiserMinuterie(): void {
    // Réinitialiser la minuterie
    clearInterval(this.minuterie);
  }

  private lancerMinuterie(): void {
    this.tempsRestant = this.tempsParQuestion;

    // Lancer la minuterie pour passer à la question suivante après le temps défini
    this.minuterie = setInterval(() => {
      this.tempsRestant--;

      // Vérifier si le temps est écoulé
      if (this.tempsRestant === 0) {
        const correct={
          est_correct:"Faux",
          points:0
        }
        this.onReponseClick(correct,this.joueurActuel); // Appeler la méthode avec une réponse incorrecte
      }
    }, 1000);
  }

  miseAJourProgression() {
    this.progression = (this.compteur + 1) / this.questionNiVCat.length;
  }

  getProgressBarColor() {
    const ratio = this.score1 / this.taille;
    if (ratio < 1/3) {
      return 'success'; // Vert pour moins de 1/3
    } else if (ratio < 2/3) {
      return 'warning'; // Jaune pour moins de 2/3
    } else {
      return 'danger'; // Rouge pour 2/3 ou plus
    }
  }

}
