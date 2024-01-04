import { Component } from '@angular/core';
import { ActionSheetController, AlertController, LoadingController } from '@ionic/angular';
import { QuizService } from '../services/quiz.service';
import { Router } from '@angular/router';
import {Storage} from '@ionic/storage'
import { Howl } from 'howler';
import { ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AuthService } from '../services/auth.service';
import { AppComponent } from '../app.component';
// import { DynamicModalContentComponent } from '../dynamic-modal-content-component/dynamic-modal-content-component.component';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  sound: Howl | undefined;
   clickSound!: Howl;
  isPlaying: boolean = false;
  lastPosition: number = 0;
  isPaused: boolean = false;
  p=0

  constructor(
    public actionSheetController: ActionSheetController,
    private router: Router,
    private quiz: QuizService,
    private storage: Storage,
    public modalController: ModalController,
    private socialSharing: SocialSharing,
    private translate: TranslateService,
    private auth:AuthService,
    private appComponent: AppComponent
  ) {
    // Démarrer la musique automatiquement au chargement de la page
    this.loadAndPlaySound();
  }

  // initializeClickSound(): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     this.clickSound = new Howl({
  //       src: ['assets/sounds/clicks.mp3'],
  //       volume: 1,
  //       onload: () => {
  //         console.error('cest bon');

  //         resolve();
  //       },
  //       onloaderror: (error) => {
  //         console.error('Error loading click sound:', error);
  //         reject();
  //       }
  //     });
  //   });
  // }

  // async playClickSound() {
  //   if (this.clickSound) {
  //     this.clickSound.play();
  //   }
  // }
  shareContent() {
    // Exemple de contenu à partager
    let message = "Découvrez ce super Jeu sur le Mboa";
    let subject = "Mboaculture";
    // let file = null; // Vous pouvez ajouter des images ou des fichiers si nécessaire
    let url = "https://www.exemple.com";

    this.socialSharing.share(message, subject, url)
      .then(() => {
        // Succès
      }).catch((error) => {
        // Gestion des erreurs
      });
  }
  get letters() {
    return this.translate.instant("Quiz_home").split('');
  }
  getLettersWithDelay() {
    const text = this.translate.instant("Quiz_home");
    return Array.from(text).map((char, index) => ({ char, delay: index }));
  }


  loadAndPlaySound() {
    // Vérifier si la musique est déjà en cours de lecture
    if (!this.sound || !this.sound.playing()) {
      // Chargez le son
      this.sound = new Howl({
        src: ['assets/sounds/Ks-Bloom.mp3'],
        loop: true,
        volume: 1.0,
        mute: false,
        onend: () => {
          this.isPlaying = false;
          console.log('Sound ended');
        },
      });


      // Si la musique est en pause, reprenez la lecture à la dernière position connue
      if (!this.isPlaying) {
        this.sound.seek(this.lastPosition);
        this.sound.play();
        this.isPlaying = true;
        console.log('Sound started');
      }
    }
  }

  toggleAndPlaySound() {
    console.log('Toggle sound clicked');
    if (this.sound) {
      if (this.isPlaying) {
        // Si la musique est en cours de lecture, mettez-la en pause
        this.lastPosition = this.sound.seek(); // Enregistrez la dernière position avant la pause
        this.sound.pause();
        this.isPlaying = false;
        this.isPaused = true; // Mettez à jour l'état de la pause
        console.log('Sound paused');
      } else {
        // Si la musique est en pause ou n'a pas encore été chargée, jouez le son
        this.loadAndPlaySound();
        this.isPaused = false; // Mettez à jour l'état de la pause
      }
    }
  }

  // async presentModal(content: string) {
  //   const modal = await this.modalController.create({
  //     component: DynamicModalContentComponent,
  //     componentProps: {'content': content},
  //     cssClass: 'custom-modal-size'

  //   });
  //   return await modal.present();
  // }


  // async showInstructions() {
  //   const instructions = `
  //     <ion-content style="background-color: #f0f0f0; padding: 20px;">
  //       <div class="modal-content" style="background-color: #fff; padding: 20px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); max-width: 80%; margin: auto;">
  //         <h2 style="font-size: 1.5em; color: #333; margin-bottom: 10px;">Comment jouer à MboaCulture</h2>
  //         <p style="font-size: 1em; color: #666;">Bienvenue dans MboaCulture, l'application de quiz qui mettra à l'épreuve vos connaissances sur le Mboa ! Voici comment jouer :</p>
  //         <ul style="list-style-type: none; padding: 0; margin: 0;">
  //           <li style="margin-bottom: 10px; font-size: 0.9em; color: #555;"><strong>Commencer le jeu :</strong> Appuyez sur le bouton "Jouer" pour lancer un nouveau quiz.</li>
  //           <li style="margin-bottom: 10px; font-size: 0.9em; color: #555;"><strong>Répondre aux questions :</strong> Chaque quiz comprend une série de questions à choix multiples. Sélectionnez la réponse que vous pensez être correcte.</li>
  //           <li style="margin-bottom: 10px; font-size: 0.9em; color: #555;"><strong>Limite de temps :</strong> Vous avez un temps limité pour répondre à chaque question. Soyez rapide pour marquer plus de points !</li>
  //           <li style="margin-bottom: 10px; font-size: 0.9em; color: #555;"><strong>Score :</strong> Votre score dépend de la rapidité et de la précision de vos réponses.</li>
  //           <li style="margin-bottom: 10px; font-size: 0.9em; color: #555;"><strong>Fin du jeu :</strong> Le jeu se termine après la dernière question. Vous pouvez voir votre score final et tenter de le battre lors de votre prochaine partie !</li>
  //         </ul>
  //         <p style="font-size: 1em; color: #666; margin-bottom: 0;">Amusez-vous bien et bonnes découvertes sur MboaCulture !</p>
  //         <ion-button class="close-button" style="margin-top: 20px; color: #007bff;">Fermer</ion-button>
  //       </div>
  //     </ion-content>
  //   `;

  //   console.log('Instructions:', instructions);

  //   const modal = await this.modalController.create({
  //     component: DynamicModalContentComponent,
  //     componentProps: { content: instructions },
  //     cssClass: 'custom-modal-size',
  //   });

  //   return await modal.present();
  // }







    loading = true
    listCategorie:any[]=[]
    listQuestion:any[]=[]
    listNiveaux:any[]=[]
    listReponses:any[]=[]
    niveauxbd:any
    categoriebd:any
    questiondb:any
    reponsesbd:any



    // toggleSound() {
    //   this.sound.mute(!this.sound.mute());
    // }


  async ngOnInit() {
      this.initialize_bd()
  }


  async startFunction() {
    this.router.navigate(['/nombre-jouers'])
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

        }
        this.storage.set("niveaux",this.listNiveaux)
      })

      this.quiz.getListOfReponses().subscribe((reponse:any)=>{
        const reponses= reponse
        console.log(reponses)

        for(let i=0; i< reponses.length; i++){
           this.reponsesbd={id:reponses[i].id ,choix:reponses[i].choix,est_correct:reponses[i].est_correct,
            points:reponses[i].points,questions_id:reponses[i].questions_id}
           this.listReponses.push(this.reponsesbd)
        }
        this.storage.set("reponses",this.listReponses)
      })
      await this.storage.set("is_initialize",true)
    }

  }

  changerLangue(langue:any) {
    this.appComponent.changerLangue(langue)

  }



}
