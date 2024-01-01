import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { ModalController } from '@ionic/angular';


import { HomePageRoutingModule } from './home-routing.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule.forChild(),
    HomePageRoutingModule,
    
  ],
  declarations: [HomePage,],
  exports: [],
  providers: [ModalController]
})
export class HomePageModule {}
