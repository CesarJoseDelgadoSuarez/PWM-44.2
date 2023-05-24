import { Injectable } from '@angular/core';
import { UserCredential } from '@angular/fire/auth';
import { Firestore, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { User } from 'src/app/models/User/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {


  constructor(private firestore: Firestore) {}

  async getUserById(coll: string) {
    const docRef = doc(this.firestore, coll);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      return undefined;
    }
  }
  createUser(user: User) {
    const collRef = doc(this.firestore, 'users', user.id);
    return setDoc(collRef, user);
  }

  updateUser(user: {}, coll:string) {
    const collRef = doc(this.firestore, coll)
    return updateDoc(collRef, user);
  }
}
