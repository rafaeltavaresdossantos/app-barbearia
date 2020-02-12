import { Component, OnInit } from '@angular/core';
import { BarbeariasService } from '../../services/barbearias.service';
import { Observable } from 'rxjs';
import { Barbearia } from '../../models/barbearia.model';
import { BarbeariasPadraoService } from '../../services/barbearias-padrao.service';
import { Router } from '@angular/router';
import { BarbeariasPadrao } from '../../models/barbearias-padrao.model';

@Component({
  selector: 'app-lista-barbearias',
  templateUrl: './lista-barbearias.component.html',
  styleUrls: ['./lista-barbearias.component.scss'],
})
export class ListaBarbeariasComponent implements OnInit {

  public barbearias$: Observable<Barbearia[]>;

  constructor(
    private barbeariasPadrao: BarbeariasPadraoService,
    private barbeariasService: BarbeariasService,
    private router: Router
  ) { }

  ngOnInit() {

    this.barbearias$ = this.barbeariasService.getAllBarbearias();
  }

  acessarBarbearia(id: string) {
    this.router.navigate([`/barbearias/${id}`]);
  }

  togglePadrao(barbearia) {
    this.barbeariasPadrao.togglePadrao(barbearia);
  }

}
