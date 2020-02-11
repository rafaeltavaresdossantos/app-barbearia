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
        loadChildren: () => import('./pages/barbearia-salao/barbearia-salao.module').then(m => m.BarbeariaSalaoModule)
      },
      {
        path: '',
        loadChildren: () => import('./pages/lista-barbearias/lista-barbearias.module').then(m => m.ListaBarbeariasModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(rotas)],
  exports: [RouterModule]
})
export class BarbeariasRoutingModule {}
