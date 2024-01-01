import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NombreJouersPageRoutingModule } from './nombre-jouers-routing.module';

import { NombreJouersPage } from './nombre-jouers.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    NombreJouersPageRoutingModule
  ],
  declarations: [NombreJouersPage]
})
export class NombreJouersPageModule {}
