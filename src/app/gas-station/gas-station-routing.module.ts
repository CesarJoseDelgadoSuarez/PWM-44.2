import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GasStationPage } from './gas-station.page';

const routes: Routes = [
  {
    path: '',
    component: GasStationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GasStationPageRoutingModule {}
