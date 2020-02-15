import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BarbeariasService } from '../../services/barbearias.service';
import { Observable } from 'rxjs';
import { Barbearia } from '../../models/barbearia.model';

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

  public barbeiros = [
    {
      nome: 'Jeferson',
      exp: 'Cortes desenhados'
    },
    {
    nome: 'João',
    exp: 'Degradê'
    },
    {
      nome: 'Gabriel',
      exp: ` - Barba
             - Cortes: Simples, Degradê, Frizado e Desenho.  
        `
    }
  ]
  public barbearia$ :Observable<Barbearia>

  constructor(
    private route: ActivatedRoute,
    private barbeariasService: BarbeariasService
  ) {}

  ngOnInit() {
    //Pegando rota do navegador, apenas id
    const id = this.route.snapshot.paramMap.get('id')
    this.barbearia$ = this.barbeariasService.get(id)
  }

}
