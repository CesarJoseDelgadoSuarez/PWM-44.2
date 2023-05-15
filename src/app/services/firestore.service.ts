import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore : Firestore) { }

  getCollection(collectionName: string): Observable<any> {
    const collectionInfo = collection(this.firestore, collectionName);
    return collectionData(collectionInfo,{idField :'id'})
  }

}
