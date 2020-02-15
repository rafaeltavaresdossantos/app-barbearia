import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth.guard';

const rotas: Routes = [
  {
    path: '',
    canActivateChild: [ AuthGuard ],
    children: [
      {
        path: ':id',
        loadChildren: () => import('./pages/barbeiro-selecionado/barbeiro-selecionado.module').then(m => m.BarbeiroSelecionadoModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class BarbeiroRoutingModule {}