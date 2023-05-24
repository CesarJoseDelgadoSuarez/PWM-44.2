import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { log } from 'console';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent  implements OnInit {
  links:any[] = [];
  linksUserNotLogged: any[] = [
    {
      name:"Home",
      url:"/"
    },
    {
      name:"Login",
      url:"/login"
    },
    {
      name:"Registration",
      url:"/registration"
    },

  ]
  constructor(private router:Router, private menuCtrl:MenuController) {
    this.links = this.linksUserNotLogged

  }

  ngOnInit() {

  }

  goToPage(page:string) {
    this.menuCtrl.toggle();
    this.router.navigate([page])
  }

}
