import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nombre-jouers',
  templateUrl: './nombre-jouers.page.html',
  styleUrls: ['./nombre-jouers.page.scss'],
})
export class NombreJouersPage implements OnInit {

  constructor(private route:Router,private alertController: AlertController,
    private translate: TranslateService) { }
  joueurs:any

  ngOnInit() {
  }

  OneJoeur(){
     this.joueurs=1
    this.route.navigate(['/categories'], { state: {joueurs:this.joueurs}} )
  }

  // Multi_joueurs(){
  //   const joueurs=3
  //   this.route.navigate(['/categorie'],{state:{joueurs:joueurs}})
  // }

  async Multi_joueurs(){
    const prompt = await this.alertController.create({
      header: 'Nombre de joueurs',
      message: 'Veuillez entrer le nombre de joueurs:',
      inputs: [
        {
          name: 'nombreDeJoueurs',
          type: 'number',
          placeholder: 'Nombre de joueurs',
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            console.log('Annuler');
          },
        },
        {
          text: 'OK',
          handler: (data) => {
            console.log('Nombre de joueurs saisi :', data.nombreDeJoueurs);

            // Appeler la fonction pour configurer le nombre de joueurs
            this.joueurs=data.nombreDeJoueurs
            this.route.navigate(['/categories'],{state:{joueurs:this.joueurs}})
          },
        },
      ],
    });

    await prompt.present();


  }

  Ajout_question(){
    this.route.navigate(['/propose-question'])
  }


}
