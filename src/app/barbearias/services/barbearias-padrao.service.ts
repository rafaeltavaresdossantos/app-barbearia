import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BarbeariasPadrao } from '../models/barbearias-padrao.model';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { switchMap, tap } from 'rxjs/operators';
import { Barbearia } from '../models/barbearia.model';
import { UsuarioService } from 'src/app/core/services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class BarbeariasPadraoService extends Firestore<BarbeariasPadrao> {

  constructor(
    private usuarioService: UsuarioService,
    db: AngularFirestore,
  ) {
    super(db);
   }

   getAllPadrao() {
     return this.usuarioService.usuario$
      .pipe(
        tap(usuario => this.setCollection(`/usuarios/${usuario.id}/barbearias-padrao`)),
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
