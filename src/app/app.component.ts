import { Component } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private quiz:QuizService, private platform:Platform, private translate: TranslateService) {

    this.platform.ready().then(()=>{
      //this.initiliazeApp();
      //this.translate.setDefaultLang('fr'); // Langue par défaut
      //this.translate.use('en');
      this.obtenirLangueTelephone()
      this.initiliazeAppsql()
    });
  }

  async initiliazeAppsql(){
    await this.quiz.createDatabase();
    //this.quiz.setIng4();
  }
  langueDuTelephone:string=''
  info:any={}
  async obtenirLangueTelephone() {
     this.info = await Device.getInfo();
    this.langueDuTelephone =  this.info.value || 'fr'; // Par défaut, utilisez 'fr' si la langue n'est pas disponible
    console.log('Langue du téléphone :', this.langueDuTelephone);
    this.translate.use(this.langueDuTelephone)
  }


}
