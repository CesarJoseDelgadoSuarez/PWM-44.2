import { FirestoreService } from '../../services/firestore.service';
import { log } from 'console';
import { Observable } from 'rxjs';
import { UserModel } from '../../user/user.model';
import { Component, OnInit } from '@angular/core';
import { GasStationService } from '../../services/gas-station.service';
import { GasStation } from '../../models/GasStation/gas-station.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public gasStations: GasStation[] = [];
  public displayedGasStations: GasStation[] = [];
  public pageSize = 10;
  public currentPage = 1;

  constructor(private gasStationService: GasStationService) {}

  ngOnInit() {
    this.getGasStations();
  }

  getGasStations() {
    this.gasStationService.getCanaryIslandsGasStations().subscribe((gasStations) => {
      this.gasStations = gasStations;
      this.loadMore();
    });
  }

  loadMore() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const newItems = this.gasStations.slice(startIndex, endIndex);
    this.displayedGasStations = this.displayedGasStations.concat(newItems);
    this.currentPage++;
  }
}




/*
  getFavoriteGasStations() {
    this.gasStationService.getFavoriteGasStations().subscribe((gasStations) => {
      this.favoriteGasStations = gasStations;
      console.log(this.favoriteGasStations);
    });
  }
  */
