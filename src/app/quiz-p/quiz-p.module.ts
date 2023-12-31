import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuizPPageRoutingModule } from './quiz-p-routing.module';

import { QuizPPage } from './quiz-p.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    QuizPPageRoutingModule
  ],
  declarations: [QuizPPage]
})
export class QuizPPageModule {}
