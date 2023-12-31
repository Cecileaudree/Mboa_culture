import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResultaPPage } from './resulta-p.page';

const routes: Routes = [
  {
    path: '',
    component: ResultaPPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResultaPPageRoutingModule {}
