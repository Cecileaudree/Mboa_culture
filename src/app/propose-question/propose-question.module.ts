import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProposeQuestionPageRoutingModule } from './propose-question-routing.module';

import { ProposeQuestionPage } from './propose-question.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProposeQuestionPageRoutingModule
  ],
  declarations: [ProposeQuestionPage]
})
export class ProposeQuestionPageModule {}
