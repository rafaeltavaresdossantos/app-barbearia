import { Injectable } from '@angular/core';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Hash } from '../models/hash';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HashService extends Firestore<Hash> {

  constructor(
    db: AngularFirestore,
  ) {
    super(db);
  }

  getHash(idHash: string): Observable<Hash> {
    this.setDoc(`/hash/${idHash}`);
    return this.doc.valueChanges().pipe(take(1));
  }
}
