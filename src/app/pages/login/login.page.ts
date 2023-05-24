import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formularioLogin: FormGroup;
  constructor(private formB: FormBuilder, private alertController: AlertController, private authservice: AuthenticationService) {
    this.formularioLogin = this.formB.group({
      'email': new FormControl("",Validators.required),
      'password': new FormControl("",Validators.required),
    })
  }

  ngOnInit() {
  }

  async iniciarSesion(){
    let form = this.formularioLogin.value;
    console.log("se ha iniciado sesion");
    if (this.formularioLogin.invalid){
      const alert = await this.alertController.create({
        header: "Formulario invalido",
        message: "Por favor ingresa las credenciales correctas",
        buttons:['Aceptar']
      })
      alert.present();
      return;
    }

    this.authservice.loginWithEmailAndPassword(form.email, form.password)

  }

}
