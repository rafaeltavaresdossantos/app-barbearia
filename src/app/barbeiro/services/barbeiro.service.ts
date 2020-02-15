import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { Barbeiro } from '../models/barbeiro.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BarbeiroService extends Firestore<Barbeiro> {

  constructor(
    db: AngularFirestore,
  ) {
    super(db);
  }

  listarBarbeirosPorBarbearia(idBarbearia: string): Observable<Barbeiro[]> {
    // pegando tabela de barbeiros por barbearia
    this.setCollection('/barbeiros', ref => ref.where('idBarbearia', '==', idBarbearia));
    return this.getAll();
  }

  listarBarbeiro(id: string): Observable<Barbeiro> {
    this.setCollection('/barbeiros');
    return this.get(id);
  }
}


