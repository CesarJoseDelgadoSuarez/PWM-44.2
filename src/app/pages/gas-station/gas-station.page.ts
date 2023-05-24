import { Component, OnInit } from '@angular/core';
import {GasStation} from "../../models/GasStation/gas-station.model";
import {GasPrice} from "../../models/GasStation/gas-price.model";
import {GasStationService} from "../../services/gas-station.service";

@Component({
  selector: 'app-gas-station',
  templateUrl: './gas-station.page.html',
  styleUrls: ['./gas-station.page.scss'],
})
export class GasStationPage implements OnInit {

  gasStation: GasStation | undefined;
  gasPrices: GasPrice[] = [];

  constructor(private gasStationService: GasStationService) { }

  ngOnInit() {
    this.gasStation = history.state;
    if (!this.gasStation) return;
    this.gasStationService.getGasStationPrice(this.gasStation).subscribe((gasPrices) => this.gasPrices = gasPrices);
  }

}
