import { Component, OnInit } from '@angular/core';
import { BarbeariasService } from '../../services/barbearias.service';
import { Observable } from 'rxjs';
import { Barbearia } from '../../models/barbearia.model';
import { BarbeariasPadraoService } from '../../services/barbearias-padrao.service';
import { Router } from '@angular/router';
import { BarbeariasPadrao } from '../../models/barbearias-padrao.model';
import { NavController } from '@ionic/angular';
import { RecursosService } from 'src/app/core/services/recursos.service';
import { messaging } from 'firebase';

@Component({
  selector: 'app-lista-barbearias',
  templateUrl: './lista-barbearias.component.html',
  styleUrls: ['./lista-barbearias.component.scss'],
})
export class ListaBarbeariasComponent implements OnInit {

  public barbearias$: Observable<Barbearia[]>;
  public pesquisar

  constructor(
    private barbeariasPadrao: BarbeariasPadraoService,
    private barbeariasService: BarbeariasService,
    private navCtrl: NavController,
    private recurososService: RecursosService
  ) { }

  ngOnInit() {
    this.carregarBarbearias();
    
  }

  acessarBarbearia(id: string) {
    this.navCtrl.navigateForward(['barbearias', id]);
  }

  togglePadrao(barbearia) {
    this.barbeariasPadrao.togglePadrao(barbearia);
  }
  async carregarBarbearias(){
    const carregando = await this.recurososService.loading({message: "Carregando barbearias..."})
      try {
        this.barbearias$ = this.barbeariasService.getAllBarbearias();
      } catch (error) {
        console.log(error)
      }finally{
        carregando.dismiss()
      }
    }
}
