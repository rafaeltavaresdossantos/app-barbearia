import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarbeariasPadrao } from '../models/barbearias-padrao.model';
import { Firestore } from 'src/app/core/classes/firestore.class';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasPadraoService extends Firestore<BarbeariasPadrao> {

  constructor(
    private authService: AuthService,
    db: AngularFirestore,
  ) {
    super(db);
    this.inicio();
   }
   inicio() {
    // console.log('init task service')

    // this.authService.estadoUsuario$.subscribe(usuario => {
    //   console.log('autenticou')
    //   if (usuario) {
    //     console.log('vai dar setcollection')
    //     this.setCollection(`/usuarios/${usuario.uid}/barbearias-padrao`);
    //     return;
    //   }
    //   this.setCollection(null);
    //   });
   }
}
