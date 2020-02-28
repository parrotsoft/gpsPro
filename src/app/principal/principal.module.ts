import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GpsProService } from '../services/gps-pro.service';
import { PrincipalPageRoutingModule } from './principal-routing.module';
import { PrincipalPage } from './principal.page';




@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule
  ],
  declarations: [PrincipalPage],
  providers: [GpsProService]
})
export class PrincipalPageModule {}
