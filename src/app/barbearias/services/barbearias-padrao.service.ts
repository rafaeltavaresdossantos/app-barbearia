import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { barbeariasPadrao } from '../models/barbearias-padrao.model';
import { Firestore } from 'src/app/core/classes/firestore.class';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasPadraoService  extends Firestore<barbeariasPadrao>{

  constructor(
    private authService: AuthService,
    db: AngularFirestore,
  ) {
    super(db);
   }
   inicio(){
     this.authService.estadoUsuario$.subscribe(usuario => {
      if(usuario) {
        this.setCollection(`/usuarios/${usuario.uid}/barbearias-padrao`)
        return
        }
        this.setCollection(null);
      })
   }
}
