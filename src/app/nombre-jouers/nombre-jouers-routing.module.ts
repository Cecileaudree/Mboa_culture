import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NombreJouersPage } from './nombre-jouers.page';

const routes: Routes = [
  {
    path: '',
    component: NombreJouersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NombreJouersPageRoutingModule {}
