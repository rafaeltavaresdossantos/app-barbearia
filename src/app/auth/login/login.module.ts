import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

const rotas: Routes = [{
  path: '',
  component: LoginComponent
}];

@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    RouterModule.forChild(rotas),
    SharedModule
  ]
})
export class LoginModule { }
