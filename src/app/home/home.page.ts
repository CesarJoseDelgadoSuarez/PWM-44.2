import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { log } from 'console';
import { Observable } from 'rxjs';
import { UserModel } from '../user/user.model';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public prueba: Observable<UserModel[]>;
  texto:string = "antes de la lista"


  constructor(private firestoreService: FirestoreService) {
    this.prueba = firestoreService.getCollection("users")
    console.log(this.prueba);
  }

  ngOnInit() {

  }

  doSomething() {
    this.texto = "buenas tardes"
  }
}
