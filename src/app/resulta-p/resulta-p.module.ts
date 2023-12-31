import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResultaPPageRoutingModule } from './resulta-p-routing.module';

import { ResultaPPage } from './resulta-p.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResultaPPageRoutingModule
  ],
  declarations: [ResultaPPage]
})
export class ResultaPPageModule {}
