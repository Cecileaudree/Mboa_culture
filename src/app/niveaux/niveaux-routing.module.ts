import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NiveauxPage } from './niveaux.page';

const routes: Routes = [
  {
    path: '',
    component: NiveauxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NiveauxPageRoutingModule {}
