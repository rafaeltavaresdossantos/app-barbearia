import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { ListaBarbeariasComponent } from './lista-barbearias.component';

const rotas: Routes = [
  {
    path: '',
    component: ListaBarbeariasComponent
  }
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(rotas)],
  declarations: [ListaBarbeariasComponent]
})
export class ListaBarbeariasModule {}
