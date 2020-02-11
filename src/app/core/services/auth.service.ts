import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { OpcoesAutenticacao, ModoAutenticacao, Usuario } from './auth.types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public estadoUsuario$: Observable<firebase.User>;

  constructor(
    private afAuth: AngularFireAuth
  ) {
    this.estadoUsuario$ = this.afAuth.authState;
  }

  // funcao responsavel por receber os dados do formulario
  // extraindo apenas email e senha e realizando a autenticao por email e senha.
  private loginComEmail({email, senha}: Usuario): Promise<auth.UserCredential> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, senha);
  }

  // funcao responsavel por cadastar o usuario no firebase,
  // se o retorno for bem sucedido autoriza a inclusão do nome
  private cadastrarComEmail({email, senha, nome}: Usuario): Promise<auth.UserCredential> {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, senha)
      .then(res => {
        return res.user.updateProfile({
          displayName: nome,
          photoURL: null,
        })
        .then(() => res);
      });

  }
  private logarComFacebook(): Promise<auth.UserCredential> {
    const dadosLogin = new auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(dadosLogin);
  }

  logar({isCadastro, modoAutenticacao, usuario}: OpcoesAutenticacao) {

    let operacao: Promise<auth.UserCredential>;

    if (modoAutenticacao === ModoAutenticacao.email) {
      operacao = isCadastro ? this.cadastrarComEmail(usuario) : this.loginComEmail(usuario);
    } else {
      operacao = this.logarComFacebook();
    }
    return operacao;

  }
  sair() {
    return this.afAuth.auth.signOut();
  }

  get isAutenticado(): Observable<boolean> {
    return this.estadoUsuario$.pipe(
      map(usuario => usuario !== null )
    );
  }

}
