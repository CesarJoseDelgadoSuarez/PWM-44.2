import { Injectable } from '@angular/core';
import {SQLite, SQLiteObject} from "@awesome-cordova-plugins/sqlite/ngx";
import {Platform} from "@ionic/angular";
import {from, Observable, of} from "rxjs";
import {GasStation} from "../models/GasStation/gas-station.model";

@Injectable({
  providedIn: 'root'
})
export class GasStationSqliteService {
  private dbInstance: SQLiteObject | undefined;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.dbConnection();
  }

  private dbConnection() {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'gasStation.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.dbInstance = db;
          this.createTable();
        });
    });
  }

  private createTable() {
    if (!this.dbInstance) return;

    this.dbInstance
      .executeSql(
        `CREATE TABLE IF NOT EXISTS favGasStation (
        gasStationId INTEGER PRIMARY KEY
        )`
      )
      .then((res) => alert(JSON.stringify(res)))
      .catch((error) => alert(JSON.stringify(error)));
  }


  getFavoriteGasStations(): Observable<GasStation[]> {
    if (!this.dbInstance) return of([]);

    return from<Promise<GasStation[]>>(
      this.dbInstance.executeSql(`SELECT * FROM favGasStation`, [])
    );
  }
}
