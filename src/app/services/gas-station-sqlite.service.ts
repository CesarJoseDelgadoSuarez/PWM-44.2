import { Injectable } from '@angular/core';
import {Platform} from "@ionic/angular";
import {from, Observable, of} from "rxjs";
import {GasStation} from "../models/GasStation/gas-station.model";
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection, capSQLiteSet,
  capSQLiteChanges, capSQLiteValues, capEchoResult, capSQLiteResult,
  capNCDatabasePathResult } from '@capacitor-community/sqlite';
import {Capacitor} from "@capacitor/core";

@Injectable({
  providedIn: 'root'
})
export class GasStationSqliteService {
  isService: boolean = false;
  platform: string | undefined;
  sqlitePlugin: any;
  native: boolean = false;
  db: SQLiteDBConnection | undefined;


  constructor() {
    this.initializePlugin().then((db) => {
      this.db = db;
      db.open();
      this.createTable();
    });
  }

  async initializePlugin(): Promise<SQLiteDBConnection> {
    this.platform = Capacitor.getPlatform();
    if ( this.platform === 'ios' || this.platform === 'android' ) {
      this.native = true;
    }
    this.sqlitePlugin = CapacitorSQLite;
    let sqlite = new SQLiteConnection(this.sqlitePlugin);
    this.isService = true;
    return await this.createConnection('gasStations', false, "no-encryption", 1, sqlite);
  }

  async createConnection(database: string, encrypted: boolean,
                         mode: string, version: number, sqlite: SQLiteConnection
  ): Promise<SQLiteDBConnection> {
    const db: SQLiteDBConnection = await sqlite.createConnection(database, encrypted, mode, version, false);
    if ( db == null || !db) {
      throw new Error(`no db returned is null`);
    }
    console.log(db);
    return db;
  }

  private createTable() {
    if (!this.db) return;

    this.db
      .execute(
        "CREATE TABLE IF NOT EXISTS favGasStation (gasStationId INTEGER PRIMARY KEY)"
      )
      .then((res) => console.log('Table creation response: ', res))
      .catch((error) => {
        throw new Error(`Table creation error: ${error}`)
      });
  }


  getFavoriteGasStations(): Observable<GasStation[]> {
    if (!this.db) return of([]);

    return from<Promise<GasStation[]>>(
      <Promise<GasStation[]>><unknown>this.db.query(`SELECT * FROM favGasStation`)
    );
  }
}
