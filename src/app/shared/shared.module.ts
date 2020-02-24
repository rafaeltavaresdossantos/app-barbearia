import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';




@NgModule({
  declarations: [],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FormsModule,
    Ng2SearchPipeModule,
    NgxDatatableModule
    
  ]
})
export class SharedModule { }
