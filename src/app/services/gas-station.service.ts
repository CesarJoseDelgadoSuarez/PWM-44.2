import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { from, map, Observable, of } from 'rxjs';
import { GasStation } from '../models/GasStation/gas-station.model';
import { GasPrice } from '../models/GasStation/gas-price.model';
import { FirestoreService } from './firestore.service';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

function rawGasStationMapper(rawGasStation: any): GasStation {
  let prices: GasPrice[] = [];
  Object.keys(rawGasStation)
    .filter((key) => key.startsWith('Precio'))
    .forEach((key) => {
      if (rawGasStation[key] === '') {
        return;
      }
      prices.push({
        gas_type: key.substring(7),
        price: parseFloat(rawGasStation[key].replace(',', '.')),
      } as GasPrice);
    });

  return {
    zip: rawGasStation['C.P.'],
    address: rawGasStation['Dirección'],
    business_hours: rawGasStation['Horario'],
    latitude: parseFloat(rawGasStation['Latitud'].replace(/,/g, '.')),
    locality: rawGasStation['Localidad'],
    longitude: parseFloat(rawGasStation['Longitud (WGS84)'].replace(/,/g, '.')),
    margin: rawGasStation['Margen'],
    municipality: rawGasStation['Municipio'],
    province: rawGasStation['Provincia'],
    remission: rawGasStation['Retribución'],
    name: rawGasStation['Rótulo'],
    sale_type: rawGasStation['Tipo Venta'],
    bio_ethanol_percentage: rawGasStation['Porcentaje Bioetanol'],
    methyl_ester_percentage: rawGasStation['Porcentaje Metanol'],
    IDEESS: rawGasStation['IDEESS'],
    municipality_id: rawGasStation['IDMunicipio'],
    province_id: rawGasStation['IDProvincia'],
    IDCCAA: rawGasStation['IDCCAA'],
    gasPrices: prices,
  } as GasStation;
}

@Injectable({
  providedIn: 'root',
})
export class GasStationService {
  private collection = 'gasStations';
  private dbInstance: SQLiteObject | undefined;

  constructor(
    protected http: HttpClient,
    private firestoreService: FirestoreService,
    private sqlite: SQLite,
    private platform: Platform
  ) {
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

  createTable() {
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

  getCanaryIslandsGasStations(): Observable<GasStation[]> {
    return this.firestoreService.getCollection(this.collection);
  }

  getGasStationPrice(gasStation: GasStation): Observable<GasPrice[]> {
    return this.getCityGasStations(gasStation.municipality_id).pipe(
      map((gasStationArray: any[]) => {
        return gasStationArray.find(
          (value) => value.IDEESS === gasStation.IDEESS
        ).gasPrices;
      })
    );
  }

  private getCityGasStations(cityID: string): Observable<GasStation[]> {
    return this.http
      .get(
        `https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/FiltroMunicipio/${cityID}`
      )
      .pipe(
        map((rawGasStations: any) =>
          rawGasStations.ListaEESSPrecio.map(rawGasStationMapper)
        )
      );
  }

  getFavoriteGasStations(): Observable<GasStation[]> {
    if (!this.dbInstance) return of([]);

    return from<Promise<GasStation[]>>(
      this.dbInstance.executeSql(`SELECT * FROM favGasStation`, [])
    );
  }
}
