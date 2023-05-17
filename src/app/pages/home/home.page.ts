import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { log } from 'console';
import { Observable } from 'rxjs';
import { UserModel } from '../../user/user.model';
import {GasStation} from "../../models/GasStation/gas-station.model";
import {GasStationService} from "../../services/gas-station.service";
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public gasStations: GasStation[] = [];
  texto:string = "Despues de la lista"


  constructor(private gasStationService: GasStationService) {
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {

    this.gasStationService.getCanaryIslandsGasStations().subscribe((gasStations) => {
      this.gasStations = gasStations;
    })
  }

  doSomething() {
    this.texto = "buenas tardes"
  }
}
