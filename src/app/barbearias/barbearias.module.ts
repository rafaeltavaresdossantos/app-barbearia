import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarbeariasComponent } from './barbearias.component';
import { SharedModule } from '../shared/shared.module';
import { BarbeariaSalaoComponent } from './barbearia-salao/barbearia-salao.component';

const rotas: Routes = [{
  path: '',
  component: BarbeariasComponent
},
  {
    path: ':id',
    component: BarbeariaSalaoComponent
  }
];

@NgModule({
  declarations: [
    BarbeariasComponent,
    BarbeariaSalaoComponent,
  ],
  imports: [
    RouterModule.forChild(rotas),
    SharedModule
  ]
})
export class BarbeariasModule { }
