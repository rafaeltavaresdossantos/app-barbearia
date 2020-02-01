import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BarbeariasComponent } from './barbearias.component';
import { SharedModule } from '../shared/shared.module';

const rotas: Routes = [{
  path: '',
  component: BarbeariasComponent
}];

@NgModule({
  declarations: [
    BarbeariasComponent,
  ],
  imports: [
    RouterModule.forChild(rotas),
    SharedModule
  ]
})
export class BarbeariasModule { }
