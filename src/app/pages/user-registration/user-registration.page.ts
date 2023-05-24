import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormControl, Validators} from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/auth/authentication.service';
@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.page.html',
  styleUrls: ['./user-registration.page.scss'],
})
export class UserRegistrationPage implements OnInit {

  formularioRegistro: FormGroup;

  constructor(private formB: FormBuilder, private alertController: AlertController, private authservice: AuthenticationService) {
    this.formularioRegistro = this.formB.group({
      'email': new FormControl(
        "",
        Validators.compose(
          [
            Validators.maxLength(70),
            Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
            Validators.required
          ])
        ),
      'password': new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)])),
      'confirmPassword': new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)])),
      'username': new FormControl("",Validators.required),
    })
  }
  ngOnInit() {
  }

  async registarUsuario() {
    let form = this.formularioRegistro.value;
    console.log("se ha iniciado sesion");
    if (this.formularioRegistro.invalid){
      const alert = await this.alertController.create({
        header: "Formulario invalido",
        message: "Todos los campos son requeridos, no pueden estar vacios \n Las contraseñas deben de tener 6 caracteres como minimo",
        buttons:['Aceptar']
      })
      alert.present();
      return;
    }
    if (form.password!==form.confirmPassword) {
      const alert = await this.alertController.create({
        header: "Formulario invalido",
        message: "Las contraseñas deben coincidir",
        buttons:['Aceptar']
      })
      alert.present();
      return;
    }

    this.authservice.createUserWithEmailAndPassword(form.email, form.password, form.username)

  }
}
