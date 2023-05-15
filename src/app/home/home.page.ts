import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import { log } from 'console';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private firestoreService: FirestoreService) {}

  ngOnInit() {
    this.firestoreService.getCollection("users")
    .subscribe(collection => {
      console.log(collection);
    })
  }
}
