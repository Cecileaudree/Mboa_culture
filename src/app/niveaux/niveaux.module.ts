import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NiveauxPageRoutingModule } from './niveaux-routing.module';

import { NiveauxPage } from './niveaux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NiveauxPageRoutingModule
  ],
  declarations: [NiveauxPage]
})
export class NiveauxPageModule {}
