import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GasStationPageRoutingModule } from './gas-station-routing.module';

import { GasStationPage } from './gas-station.page';
import {componentsModule} from "../general-components/components.module";
import {GasPriceListComponent} from "./gas-price-list/gas-price-list.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GasStationPageRoutingModule,
    componentsModule
  ],
  declarations: [GasStationPage, GasPriceListComponent]
})
export class GasStationPageModule {}
