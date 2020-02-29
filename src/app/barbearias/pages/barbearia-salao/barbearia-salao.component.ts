import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarbeariasService } from '../../services/barbearias.service';
import { Observable } from 'rxjs';
import { Barbearia } from '../../models/barbearia.model';
import { BarbeiroService } from 'src/app/barbeiro/services/barbeiro.service';
import { Barbeiro } from 'src/app/barbeiro/models/barbeiro.model';
import { IMAGEM_BARBEIRO_PADRAO } from 'src/app/barbeiro/constantes/imagem-barbeiro-padrao';
import { IMAGEM_BARBEARIA_PADRAO } from 'src/app/barbearias/constantes/imagem-barbearia-padrao';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-barbearia-salao',
  templateUrl: './barbearia-salao.component.html',
  styleUrls: ['./barbearia-salao.component.scss'],
})
export class BarbeariaSalaoComponent implements OnInit {

  sliderConfig = {
    slidesPerView: 1.6,
    spaceBetween: 10,
    centeredSlides: true
  };

  public barbeiros$: Observable<Barbeiro[]> ;
  public barbearia$: Observable<Barbearia>;
  public imagemBarbeariaPadrao = IMAGEM_BARBEARIA_PADRAO;
  public imagemBarbeiroPadrao = IMAGEM_BARBEIRO_PADRAO;

  constructor(
    private route: ActivatedRoute,
    private barbeariasService: BarbeariasService,
    private barbeiroService: BarbeiroService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    // Pegando rota do navegador, apenas id
    const id = this.route.snapshot.paramMap.get('id');
    this.barbearia$ = this.barbeariasService.get(id);
    this.barbeiros$ = this.barbeiroService.listarBarbeirosPorBarbearia(id);
  }
  acessarBarbeiro(id: string) {
    this.navCtrl.navigateForward(['barbeiro', id]);
  }

}
