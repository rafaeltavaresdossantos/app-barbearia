import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { Route } from '@angular/compiler/src/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

const rotas: Routes = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(rotas),
    FormsModule,
    IonicModule,
  ]
})
export class LoginModule { }
