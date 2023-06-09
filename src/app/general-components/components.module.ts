import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { HeaderComponent } from "./header/header.component";
import { SideMenuComponent } from "./side-menu/side-menu.component";
@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent
  ],
  imports:[
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    SideMenuComponent
  ]
})

export class componentsModule {}
