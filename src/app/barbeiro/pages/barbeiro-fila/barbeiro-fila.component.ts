import { Component, OnInit } from '@angular/core';
import { IMAGEM_BARBEIRO_PADRAO } from '../../constantes/imagem-barbeiro-padrao';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/core/services/auth.types';
import { Barbeiro } from '../../models/barbeiro.model';
import { CortesBarbeiro } from '../../models/cortes-barbeiro.model';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { BarbeiroService } from '../../services/barbeiro.service';
import { CortesBarbeiroService } from '../../services/cortes-barbeiro.service';
import { FilaBarbeiroService } from '../../services/fila-barbeiro.service';
import { ActivatedRoute } from '@angular/router';
import { RecursosService } from 'src/app/core/services/recursos.service';
import { NavController } from '@ionic/angular';
import { FilaBarbeiro } from '../../models/fila-barbeiro.model';

@Component({
  selector: 'app-barbeiro-fila',
  templateUrl: './barbeiro-fila.component.html',
  styleUrls: ['./barbeiro-fila.component.scss'],
})
export class BarbeiroFilaComponent implements OnInit {

  public imagemPadrao = IMAGEM_BARBEIRO_PADRAO;
  public usuario$: Observable<Usuario>;
  public barbeiro$: Observable<Barbeiro>;
  public filaBarbeiro$: Observable<FilaBarbeiro[]>;
  public cortesBarbeiro$: Observable<CortesBarbeiro[]>;
  public filaDoUsuario$: Observable<FilaBarbeiro>;
  private idBarbeiro: string;

  constructor(
    private usuarioService: UsuarioService,
    private barbeiroService: BarbeiroService,
    private cortesBarbeiroService: CortesBarbeiroService,
    private filaBarbeiroService: FilaBarbeiroService,
    private route: ActivatedRoute,
    private recursosService: RecursosService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {

    this.idBarbeiro = this.route.snapshot.paramMap.get('id');

    this.usuario$ = this.usuarioService.usuario$;
    this.barbeiro$ = this.barbeiroService.listarBarbeiro(this.idBarbeiro);
    this.cortesBarbeiro$ = this.cortesBarbeiroService.getCortes(this.idBarbeiro);
    this.filaBarbeiro$ = this.filaBarbeiroService.getFila(this.idBarbeiro);
    this.filaDoUsuario$ = this.filaBarbeiroService.filaDoUsuario(this.idBarbeiro);
  }

  async sairDaFila(fila: FilaBarbeiro) {
    try {
      await this.filaBarbeiroService.sairDaFila(fila);
      console.log('usuário removido da fila');
    } catch (error) {
      console.log('erro ao remover usuário', error);
    }
  }

}
