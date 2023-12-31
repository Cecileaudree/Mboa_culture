import { Component } from '@angular/core';
import { QuizService } from './services/quiz.service';
import { Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
      this.translate.use('en');
      this.initiliazeAppsql()
    });
  }

  async initiliazeAppsql(){
    await this.quiz.createDatabase();
    //this.quiz.setIng4();
  }


}
