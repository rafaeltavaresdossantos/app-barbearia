import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Barbearia } from '../models/barbearia.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { BarbeariasPadraoService } from './barbearias-padrao.service';
import { map, tap } from 'rxjs/operators';
import { ordenaArrayDecrescente, ordenaArrayCrescente } from 'src/app/shared/helpers/ordena-array';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasService extends Firestore<Barbearia> {

  constructor(
    private barbeariasPadraoService: BarbeariasPadraoService,
    db: AngularFirestore,
  ) {
    super(db);
    this.inicio();
  }

  inicio() {
    this.setCollection('/barbearias');
  }

  getAllBarbearias(): Observable<Barbearia[]> {
    return combineLatest(
      this.getAll(),
      this.barbeariasPadraoService.getAllPadrao()
    )
    .pipe(
      map(this.mapBarbearia.bind(this)),
      map(ordenaArrayCrescente('nome')),
      map(ordenaArrayDecrescente('padrao')),
    );
  }

  private mapBarbearia([barbearias, barbeariasPadrao]) {
    return barbearias.map(barbearia => ({
      ...barbearia,
      padrao: this.barbeariasPadraoService.getById(barbeariasPadrao, barbearia.id) !== null,
      objectPadrao: this.barbeariasPadraoService.getById(barbeariasPadrao, barbearia.id)
    }));
  }
}
