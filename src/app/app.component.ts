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

  }
}
