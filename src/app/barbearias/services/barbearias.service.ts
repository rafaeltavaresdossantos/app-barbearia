import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Barbearia } from '../models/barbearia.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest } from 'rxjs';
import { BarbeariasPadraoService } from './barbearias-padrao.service';
import { map, tap } from 'rxjs/operators';

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

  // getAll(): Observable<Barbearia[]> {
  //   return combineLatest(
  //     this.collection.valueChanges(),
  //     this.barbeariasPadraoService.getAll()
  //   )
  //   .pipe(
  //     tap(console.log),
  //     map(this.mapBarbearia),
  //     tap(console.log),
  //   );
  // }

  // private mapBarbearia([barbearias, barbeariasPadrao]) {
  //   return barbearias.map(barbearia => ({
  //     ...barbearia,
  //     padrao: barbeariasPadrao.find(padrao => padrao.idBarbearia === barbearia.id) !== undefined
  //   }));
  // }
}
