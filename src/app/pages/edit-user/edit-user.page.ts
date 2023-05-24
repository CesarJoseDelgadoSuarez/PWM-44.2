import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { log } from 'console';
import { User } from 'src/app/models/User/user.model';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  formularioEditUser: FormGroup;
  fileUploading:boolean = false;
  fileUploaded:boolean = false;
  currentUser:User;
  constructor(private formB: FormBuilder, private alertController: AlertController, private authservice: AuthenticationService, private userService: UserService, private storageService: StorageService) {
    this.currentUser = this.authservice.getLogedUser()
    this.formularioEditUser = this.formB.group({
      'email': new FormControl(this.currentUser.email,Validators.required),
      'username': new FormControl(this.currentUser.username,Validators.required),
    })
  }

  ngOnInit() {
  }

  async editUser(){
    const form = this.formularioEditUser.value
    this.currentUser.username = form.username
    console.log(this.currentUser.username)

    this.userService.editUser(this.currentUser, `users/${this.currentUser.id}`)

  }

  async uploadFile(event:any){
    const f = event.target.files[0]
    if (f.type.split('/')[0] === 'image'){
      const alert = await this.alertController.create({
        header: "Imagen invalida",
        message: "Por favor introduce una imagen",
        buttons:['Aceptar']
      })
      alert.present();
      return;
    }
  }
}
