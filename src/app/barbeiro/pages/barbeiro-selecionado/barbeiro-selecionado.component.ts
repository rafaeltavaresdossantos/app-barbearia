import { Component, OnInit } from '@angular/core';
import { BarbeiroService } from '../../services/barbeiro.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Barbeiro } from '../../models/barbeiro.model';

@Component({
  selector: 'app-barbeiro-selecionado',
  templateUrl: './barbeiro-selecionado.component.html',
  styleUrls: ['./barbeiro-selecionado.component.scss'],
})
export class BarbeiroSelecionadoComponent implements OnInit {

  
  public linhas = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' },
  ];
public colunas = [
    { prop: 'name' },
    { name: 'Gender' },
    { name: 'Company' }
  ];

  public barbeiro$: Observable<Barbeiro>;
  
  constructor(
    private barbeiroService: BarbeiroService,
    private route: ActivatedRoute
  ) {
    
  }

  ngOnInit() {
   const id = this.route.snapshot.paramMap.get('id');
   this.barbeiro$ = this.barbeiroService.listarBarbeiro(id);
   this.barbeiro$.subscribe(console.log)


  }

}
