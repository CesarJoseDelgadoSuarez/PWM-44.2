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

  formularioActualizarUsuario: FormGroup;
  userLoged: User;
  file: File | undefined = undefined
  fileUrl: string = "";
  fileUploaded: boolean = false;
  fileUploading: boolean = false;

  constructor(private formB: FormBuilder, private alertController: AlertController, private userService: UserService, private authService: AuthenticationService, private storageService: StorageService) {
    this.userLoged = this.authService.getUser()
    this.formularioActualizarUsuario = this.formB.group({
      'username': new FormControl(this.userLoged.username,Validators.required),
      'email': new FormControl(this.userLoged.email,Validators.required),
    })
  }
  ngOnInit() {
  }

  updateUser(){
    let form = this.formularioActualizarUsuario.value;
    this.userLoged.username = form.username
    console.log(this.userLoged);
    while(this.fileUploading){
      console.log("dentro")
    }

    this.userService.updateUser(this.userLoged, `users/${this.userLoged.id}`)
    this.authService.userUpdated();
  }

  async uploadFile(event: any) {

    const f = event.files[0]
    if (f.type.split('/')[0]!=='image'){
      const alert = await this.alertController.create({
        header: "Foto invalida",
        message: "Por favor selecciona una imagen",
        buttons:['Aceptar']
      })
      alert.present();
      return;
    }
    const fileToUpload = new File([f],this.userLoged.id,{type:f.type})
    console.log(fileToUpload)
    this.fileUploading = true;
    this.fileUploaded = false;

    const path = `users/${this.userLoged.id}`;
    console.log(path)
    this.storageService.uploadFile(fileToUpload,path).subscribe(urlListener => {
      urlListener.subscribe((url: string)=>{
        this.userLoged.photo_url = url
        console.log("url de la foto: ", this.userLoged.photo_url)
        this.fileUploading=false
        this.fileUploaded=true
      })
    })
  }
}
