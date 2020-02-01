import { Injectable } from '@angular/core';
import { firestore } from 'firebase';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { barbearias } from '../models/barbearias.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasService extends Firestore<barbearias> {

  constructor(
    db: AngularFirestore,
  ) { 
    super(db)
  }
  inicio(){
    this.setCollection('/barbearias')
  }
}
