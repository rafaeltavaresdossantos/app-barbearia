import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CortesBarbeiro } from '../models/cortes-barbeiro.model';

@Injectable({
  providedIn: 'root'
})
export class CortesBarbeiroService extends Firestore<CortesBarbeiro> {

  constructor(
    db: AngularFirestore,
  ) {
    super(db);
  }

  getCortes(idBarbeiro: string): Observable<CortesBarbeiro[]> {
    this.setCollection(`/barbeiros/${idBarbeiro}/cortes`);
    return this.getAll();
  }
}
