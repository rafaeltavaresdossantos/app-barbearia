import { Injectable } from '@angular/core';
import { Firestore } from '../classes/firestore.class';
import { Usuario } from './auth.types';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Hash } from 'src/app/auth/models/hash';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends Firestore<Usuario> {

  constructor(
      db: AngularFirestore,
      private authService: AuthService
  ) {
    super(db);
    this.receberUsuarioLogado();
  }

  public get usuario$(): Observable<Usuario> {
    if (this.doc) {
      return this.doc.valueChanges();
    }

    return this.receberUsuarioLogado();
  }

  async atualizarDadosCadastrais(usuario: firebase.User, hash: Hash) {
    this.setDoc(`usuarios/${usuario.uid}`);
    await this.createDoc({
        id: usuario.uid,
        nome: usuario.displayName,
        tipo: hash.tipoUsuario
    });
  }

  private receberUsuarioLogado(): Observable<Usuario> {
    return this.authService.estadoUsuario$.pipe(
      switchMap((usuario: firebase.User) => {
        if (usuario) {
            this.setDoc(`usuarios/${usuario.uid}`);
            return this.doc.valueChanges();
        }
    }));
  }

}

