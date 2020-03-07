import { Component, OnInit } from '@angular/core';
import { BarbeiroService } from '../../services/barbeiro.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Barbeiro } from '../../models/barbeiro.model';
import { FilaBarbeiroService } from '../../services/fila-barbeiro.service';
import { FilaBarbeiro } from '../../models/fila-barbeiro.model';
import { CortesBarbeiroService } from '../../services/cortes-barbeiro.service';
import { CortesBarbeiro } from '../../models/cortes-barbeiro.model';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/services/auth.types';
import { IMAGEM_BARBEIRO_PADRAO } from 'src/app/barbeiro/constantes/imagem-barbeiro-padrao';
import { RecursosService } from 'src/app/core/services/recursos.service';

@Component({
  selector: 'app-barbeiro-selecionado',
  templateUrl: './barbeiro-selecionado.component.html',
  styleUrls: ['./barbeiro-selecionado.component.scss'],
})
export class BarbeiroSelecionadoComponent implements OnInit {

  // public lista = [
  //   { servico: 'Barba', tempo: '15min', preco: this.convertMoeda(13)},
  //   { servico: 'Corte', tempo: '15min', preco: this.convertMoeda(13)},
  //   { servico: 'Luzes', tempo: '15min', preco: this.convertMoeda(13)},
  //   { servico: 'Dezenhos', tempo: '15min', preco: this.convertMoeda(13)},
  //   { servico: 'Pezinho', tempo: '15min', preco: this.convertMoeda(13)},
  //   { servico: 'Alizante', tempo: '15min', preco: this.convertMoeda(13)},
  //   { servico: 'Frizado', tempo: '15min', preco: this.convertMoeda(13)}
  // ];

  public colunas = [
    { nome: 'Serviços' },
    { valor: 'Preços' },
  ];

  public imagemPadrao = IMAGEM_BARBEIRO_PADRAO;
  public usuario$: Observable<Usuario>;
  public barbeiro$: Observable<Barbeiro>;
  public filaBarbeiro$: Observable<number>;
  public cortesBarbeiro$: Observable<CortesBarbeiro[]>;
  public usuarioEstaNaFila$: Observable<boolean>;

  constructor(
    private usuarioService: UsuarioService,
    private barbeiroService: BarbeiroService,
    private cortesBarbeiroService: CortesBarbeiroService,
    private filaBarbeiroService: FilaBarbeiroService,
    private route: ActivatedRoute,
    private recursosService: RecursosService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    this.usuario$ = this.usuarioService.usuario$;
    this.barbeiro$ = this.barbeiroService.listarBarbeiro(id);
    this.cortesBarbeiro$ = this.cortesBarbeiroService.getCortes(id);
    this.filaBarbeiro$ = this.filaBarbeiroService.getQuantidadeFila(id);
    this.usuarioEstaNaFila$ = this.filaBarbeiroService.usuarioEstaNaFila(id);

    // this.usuario$.subscribe((b) => console.log('Usuário:', b));
    // this.barbeiro$.subscribe((b) => console.log('Barbeiro:', b));
    // this.cortesBarbeiro$.subscribe((b) => console.log('Cortes:', b));
    // this.filaBarbeiro$.subscribe((b) => console.log('Fila:', b));
    // this.usuarioEstaNaFila.subscribe((b) => console.log('Usuario ta na fila:', b));
  }

  entrarNaFila(corte: CortesBarbeiro) {
    this.filaBarbeiroService.entrarNaFila(corte)
      .subscribe(
        res => console.log('deu certo!!', res),
        err => console.log('deu err!!', err),
        () => console.log('completou')
      );
  }

  async selecionarServico(corte: CortesBarbeiro){
    const alert = await this.recursosService.alert({
      header: 'Deseja Entrar na fila?',
      subHeader: corte.servico,
      buttons: [{
        text: 'Entrar na fila',
        handler: () => this.entrarNaFila(corte)
      },
      {
        text: 'Cancelar',
      }
    ]
    })
  }

  async sairDaFila(fila: FilaBarbeiro) {
    try {
      await this.filaBarbeiroService.sairDaFila(fila);
    } catch (error) {
      console.log(error);
    }
  }

}
