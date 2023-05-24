import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { HeaderComponent } from "./header/header.component";
import { LinksHeaderComponent } from "./links-header/links-header.component";
@NgModule({
  declarations: [
    HeaderComponent,
    LinksHeaderComponent
  ],
  imports:[
    CommonModule,
    IonicModule
  ],
  exports:[
    HeaderComponent,
    LinksHeaderComponent
  ]
})

export class componentsModule {}
