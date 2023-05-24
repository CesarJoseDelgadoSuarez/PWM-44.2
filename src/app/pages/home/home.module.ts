import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {HomePage} from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { componentsModule } from 'src/app/general-components/components.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    componentsModule
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
