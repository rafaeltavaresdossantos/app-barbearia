import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { BarbeariasComponent } from './barbearias.component';
import { SharedModule } from '../shared/shared.module';

const rotas: Routes = [{
  path: '',
  component: BarbeariasComponent
}];

@NgModule({
  declarations: [
    BarbeariasComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(rotas),
    SharedModule
  ]
})
export class BarbeariasModule { }
