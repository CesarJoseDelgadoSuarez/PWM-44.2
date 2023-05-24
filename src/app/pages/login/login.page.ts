import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { log } from 'console';
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
      'email': new FormControl("",Validators.compose(
        [
          Validators.maxLength(70),
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
          Validators.required
        ])),
      'password': new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)])),
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
      .catch(error => {
        console.log(error.message);

        this.alertController.create({
          header: "Credenciales incorrectas",
          message: "Las credenciales introducidas no son correctas. Intentelo de nuevo o cree una cuenta si no tiene una",
          buttons:['Aceptar']
        })
        .then((alert)=>{
          alert.present();
        })
      })

  }

}
