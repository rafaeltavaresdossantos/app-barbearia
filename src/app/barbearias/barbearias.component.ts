import { Component, OnInit } from '@angular/core';
import { BarbeariasService } from './services/barbearias.service';
import { Observable } from 'rxjs';
import { barbearias } from './models/barbearias.model';
import { BarbeariasPadraoService } from './services/barbearias-padrao.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-barbearias',
  templateUrl: './barbearias.component.html',
  styleUrls: ['./barbearias.component.scss'],
})
export class BarbeariasComponent implements OnInit {

  public barbearias: Observable<barbearias[]> 

  constructor(
    private barbeariasService: BarbeariasService,
    private barbeariasPadrao: BarbeariasPadraoService,
    private router: Router
  ) { }

  ngOnInit() {
    this.barbearias = this.barbeariasService.getAll();
    this.barbeariasService.getAll().subscribe(barbearias => console.log(barbearias));
  }
  acessarBarbearia(id: string){
    this.router.navigate([`/barbearias/${id}`])
  }

}
