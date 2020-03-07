import { Component, OnInit } from '@angular/core';
import { BarbeariasService } from '../../services/barbearias.service';
import { Observable } from 'rxjs';
import { Barbearia } from '../../models/barbearia.model';
import { BarbeariasPadraoService } from '../../services/barbearias-padrao.service';
import { NavController } from '@ionic/angular';
import { RecursosService } from 'src/app/core/services/recursos.service';
import { IMAGEM_BARBEARIA_PADRAO } from '../../constantes/imagem-barbearia-padrao';
import { take } from 'rxjs/operators';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { Usuario } from 'src/app/core/services/auth.types';

@Component({
  selector: 'app-lista-barbearias',
  templateUrl: './lista-barbearias.component.html',
  styleUrls: ['./lista-barbearias.component.scss'],
})
export class ListaBarbeariasComponent implements OnInit {

  public barbearias$: Observable<Barbearia[]>;
  public usuario$: Observable<Usuario>;
  public pesquisar;
  public imagemPadrao = IMAGEM_BARBEARIA_PADRAO;

  constructor(
    private barbeariasPadrao: BarbeariasPadraoService,
    private barbeariasService: BarbeariasService,
    private navCtrl: NavController,
    private recurososService: RecursosService,
    private usuariosService: UsuarioService
  ) { }

  ngOnInit() {
    this.carregarBarbearias();
    this.usuarioLogado();
  }

  acessarBarbearia(id: string) {
    this.navCtrl.navigateForward(['barbearias', id]);
  }

  togglePadrao(barbearia) {
    this.barbeariasPadrao.togglePadrao(barbearia);
  }

  async carregarBarbearias() {
    const carregando = await this.recurososService.loading({message: 'Carregando barbearias...'});
    this.barbearias$ = this.barbeariasService.getAllBarbearias();
    this.barbearias$.pipe(take(1)).subscribe(barbearias => carregando.dismiss());
  }
  public usuarioLogado(){
    this.usuario$ = this.usuariosService.usuario$;
  }
}
