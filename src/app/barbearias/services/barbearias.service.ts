import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Barbearia } from '../models/barbearia.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasService extends Firestore<Barbearia> {

  constructor(
    db: AngularFirestore,
  ) {
    super(db);
    this.inicio();
  }
  inicio() {
    this.setCollection('/barbearias', ref => ref.orderBy('padrao', 'desc'));
  }
}
