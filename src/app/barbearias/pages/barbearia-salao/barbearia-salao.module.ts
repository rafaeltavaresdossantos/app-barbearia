import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { BarbeariaSalaoComponent } from './barbearia-salao.component';

const rotas: Routes = [
  {
    path: '',
    component: BarbeariaSalaoComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(rotas)],
  declarations: [BarbeariaSalaoComponent]
})
export class BarbeariaSalaoModule {}
