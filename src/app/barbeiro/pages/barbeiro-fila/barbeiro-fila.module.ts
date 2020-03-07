import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarbeiroFilaComponent } from './barbeiro-fila.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

const rotas: Routes = [
  {
    path: '',
    component: BarbeiroFilaComponent
  }
]

@NgModule({
  declarations: [
    BarbeiroFilaComponent
  ],
  imports: [
    RouterModule.forChild(rotas),
    SharedModule
  ]
})
export class BarbeiroFilaModule { }
