import { NgModule } from '@angular/core';
import { BarbeiroSelecionadoComponent } from './barbeiro-selecionado.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const rotas: Routes = [
  {
    path: '',
    component: BarbeiroSelecionadoComponent
  }
]

@NgModule({
  declarations: [
    BarbeiroSelecionadoComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(rotas)
  ]
})
export class BarbeiroSelecionadoModule {}
