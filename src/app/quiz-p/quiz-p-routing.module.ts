import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuizPPage } from './quiz-p.page';

const routes: Routes = [
  {
    path: '',
    component: QuizPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizPPageRoutingModule {}
