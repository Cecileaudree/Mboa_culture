import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NombreJouersPageRoutingModule } from './nombre-jouers-routing.module';

import { NombreJouersPage } from './nombre-jouers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NombreJouersPageRoutingModule
  ],
  declarations: [NombreJouersPage]
})
export class NombreJouersPageModule {}
