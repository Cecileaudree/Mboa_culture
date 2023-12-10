import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';

import { QuizPageRoutingModule } from './quiz-routing.module';

import { QuizPage } from './quiz.page';

@NgModule({
  imports: [
    // RouterModule.forChild([
    //   {
    //     path: '',
    //     component: QuizPage,
    //   },
    // ]),

    TranslateModule.forChild(),
    CommonModule,
    FormsModule,
    IonicModule,
    QuizPageRoutingModule
  ],
  declarations: [QuizPage]
})
export class QuizPageModule {}
