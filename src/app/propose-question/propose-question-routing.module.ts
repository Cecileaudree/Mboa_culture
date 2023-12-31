import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProposeQuestionPage } from './propose-question.page';

const routes: Routes = [
  {
    path: '',
    component: ProposeQuestionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProposeQuestionPageRoutingModule {}
