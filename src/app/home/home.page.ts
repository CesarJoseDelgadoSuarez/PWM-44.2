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
  public usuarios: UserModel[] = [];
  texto:string = "Despues de la lista"


  constructor(private firestoreService: FirestoreService) {
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.firestoreService.getCollection("users").subscribe(data => {
      this.usuarios=data.map((user: any) =>{
        console.log(user);

        return{
          id: user.id,
          ...user
        } as UserModel;
      });
    });
  }

  doSomething() {
    this.texto = "buenas tardes"
  }
}
