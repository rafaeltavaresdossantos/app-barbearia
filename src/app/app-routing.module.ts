import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'barbearias',
    loadChildren: () => import('./barbearias/barbearias.module').then(m => m.BarbeariasModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'barbeiro',
    loadChildren: () => import('./barbeiro/barbeiro.module').then(m => m.BarbeiroModule),
    canLoad: [AuthGuard]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
