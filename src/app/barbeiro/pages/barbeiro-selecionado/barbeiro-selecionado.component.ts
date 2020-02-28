import { Component, OnInit } from '@angular/core';
import { BarbeiroService } from '../../services/barbeiro.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Barbeiro } from '../../models/barbeiro.model';

@Component({
  selector: 'app-barbeiro-selecionado',
  templateUrl: './barbeiro-selecionado.component.html',
  styleUrls: ['./barbeiro-selecionado.component.scss'],
})
export class BarbeiroSelecionadoComponent implements OnInit {

  
  public lista = [
    { servico: 'Barba', tempo: '15min', preco: this.convertMoeda(13)},
    { servico: 'Corte', tempo: '15min', preco: this.convertMoeda(13)},
    { servico: 'Luzes', tempo: '15min', preco: this.convertMoeda(13)},
    { servico: 'Dezenhos', tempo: '15min', preco: this.convertMoeda(13)},
    { servico: 'Pezinho', tempo: '15min', preco: this.convertMoeda(13)},
    { servico: 'Alizante', tempo: '15min', preco: this.convertMoeda(13)},
    { servico: 'Frizado', tempo: '15min', preco: this.convertMoeda(13)}
  ];
  
public colunas = [
    { nome: 'Serviços' },
    { valor: 'Preços' },
  ];

  public barbeiro$: Observable<Barbeiro>;
  
  constructor(
    private barbeiroService: BarbeiroService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.barbeiro$ = this.barbeiroService.listarBarbeiro(id);
    this.barbeiro$.subscribe(console.log);
    console.log(this.barbeiro$)
  }

  convertMoeda(numero){
    
    return (numero.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}))
  }

}
