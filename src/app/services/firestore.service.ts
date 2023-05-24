import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { User } from '../models/User/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : Firestore) { }

  getCollection(collectionName: string): Observable<any> {
    const collectionInfo = collection(this.firestore, collectionName);
    return collectionData(collectionInfo,{idField :'id'}) as Observable<any>
  }

}
