import { Component } from '@angular/core';
import {Platform} from "@ionic/angular";
import {GasStationSqliteService} from "./services/gas-station-sqlite.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform, private sqliteService: GasStationSqliteService) {
    this.platform.ready().then(async () => {
      this.sqliteService.initializePlugin().then(ret => {
        console.log("SQLite initialized")
      });
    });

    this.sqliteService.addFavoriteGasStation({
      IDCCAA: "awfaw",
      IDEESS: "awffwaawf",
      address: "wfaawffwafaw fawfwa",
      bio_ethanol_percentage: " awfwafa awff",
      business_hours: "awffawawf",
      latitude: 0,
      locality: "fwafaww",
      longitude: 0,
      margin: "wfafafw",
      methyl_ester_percentage: "awfwaf",
      municipality: "afwfaw",
      municipality_id: "wfafwa",
      name: "REPSOLITO",
      province: "wafafw",
      province_id: "waffaw",
      remission: "fwafaw",
      sale_type: "afwfwa",
      zip: 918012
    })?.subscribe((res) => {
      console.log('Created Gas Station: ', res)
      this.sqliteService.getFavoriteGasStations().subscribe((gasStation) => {
        console.log("Gas Stations retrieved: ", gasStation);
      })
    })

    this.sqliteService.sqlite?.echo("test").then((res) => {
      console.log("sqlite echo: ", res);
    })

  }
}
