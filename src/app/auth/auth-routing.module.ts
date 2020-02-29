import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginAutomaticoGuard } from './guards/login-automatico.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule),
    canActivate: [ LoginAutomaticoGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
