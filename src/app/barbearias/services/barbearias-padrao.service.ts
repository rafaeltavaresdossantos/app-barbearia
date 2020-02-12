import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarbeariasPadrao } from '../models/barbearias-padrao.model';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { switchMap, tap } from 'rxjs/operators';
import { Barbearia } from '../models/barbearia.model';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasPadraoService extends Firestore<BarbeariasPadrao> {

  constructor(
    private authService: AuthService,
    db: AngularFirestore,
  ) {
    super(db);
   }

   getAllPadrao() {
     return this.authService.estadoUsuario$
      .pipe(
        tap(usuario => this.setCollection(`/usuarios/${usuario.uid}/barbearias-padrao`)),
        switchMap(() => this.getAll())
      );
   }

   async togglePadrao(barbearia: Barbearia) {
    const item = barbearia.objectPadrao;

    item
      ? await this.delete(item)
      : await this.create({ id: null, idBarbearia: barbearia.id });
   }

   public getById(barbeariasPadrao, idBarbearia): BarbeariasPadrao {
    return barbeariasPadrao.find(padrao => padrao.idBarbearia === idBarbearia) || null;
   }
}
