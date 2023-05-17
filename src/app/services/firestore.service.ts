import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

import { UserModel } from '../user/user.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : Firestore) { }

  getCollection(collectionName: string): Observable<any> {
    const collectionInfo = collection(this.firestore, collectionName);
    return collectionData(collectionInfo,{idField :'id'})
    .pipe(map(usuarios => usuarios as UserModel[]))
  }

}
