import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { log } from 'console';
import { User } from 'src/app/models/User/user.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { NgOptimizedImage } from '@angular/common';
@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})

export class SideMenuComponent  implements OnInit {

  public currentUser: User | undefined = undefined;
  public photo: string="none";
  public Rol = "";
  links:any[] = [];
  linksUserNotLogged: any[] = [
    {
      name:"Home",
      url:"/"
    }
  ]
  linksUserLogged: any[] = [
    {
      name:"Home Logged",
      url:"/"
    }
  ]
  linksAdmin: any[] = [
    {
      name:"Home Admin",
      url:"/"
    }
  ]

  constructor(private router:Router, private menuCtrl:MenuController, private authService: AuthenticationService) {
    this.authService.isLoggedIn.subscribe((user) => {
      this.currentUser = user;
      console.log("usuario logeado",this.currentUser)
      if (this.currentUser) {
        if (this.currentUser.photo_url !== "none") {
          this.photo = this.currentUser.photo_url
        } else {
          this.photo = "https://firebasestorage.googleapis.com/v0/b/pwm2023-fba58.appspot.com/o/assets%2Fpng-clipart-computer-icons-user-user-icon-face-monochrome-thumbnail.png?alt=media&token=a7bd81cf-9e3a-458b-b30b-d79f1929af68"
        }
        if (this.currentUser.is_admin) {
          this.Rol = "Admin"
          this.links = this.linksAdmin
        } else {
          this.Rol = "usuarioLogeado"
          this.links = this.linksUserLogged
        }
      } else {
        this.photo="none"
        this.Rol = "usuarioNoLogeado"
        this.links = this.linksUserNotLogged
      }
      console.log(this.photo);

    })



  }

  ngOnInit() {

  }

  goToPage(page:string) {
    this.menuCtrl.toggle();
    this.router.navigate([page])
  }

  logout(){
    this.authService.logout();
  }

}
