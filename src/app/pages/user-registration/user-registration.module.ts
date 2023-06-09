import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserRegistrationPageRoutingModule } from './user-registration-routing.module';

import { UserRegistrationPage } from './user-registration.page';
import { componentsModule } from 'src/app/general-components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserRegistrationPageRoutingModule,
    componentsModule,
    ReactiveFormsModule
  ],
  declarations: [UserRegistrationPage]
})
export class UserRegistrationPageModule {}
