import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';
import { OpcoesAutenticacao, ModoAutenticacao, Usuario } from './auth.types';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public estadoUsuario$: Observable<firebase.User>

  constructor(
    private afauth: AngularFireAuth
    
  ) { 
    this.estadoUsuario$ = this.afauth.authState
  }

  //funcao responsavel por receber os dados do formulario extraindo apenas email e senha e realizando a autenticao por email e senha.
  private loginComEmail({email,senha} :Usuario) :Promise<auth.UserCredential>{
    return this.afauth.auth.signInWithEmailAndPassword(email,senha);
  }

  //funcao responsavel por cadastar o usuario no firebase, se o retorno for bem sucedido autoriza a inclusão do nome
  private cadastrarComEmail({email,senha,nome} :Usuario) :Promise<auth.UserCredential>{
    return this.afauth.auth.createUserWithEmailAndPassword(email,senha)
      .then(res => {
        return res.user.updateProfile({
          displayName: nome,
          photoURL: null,
        }).then( () => res )
      })

  }
  private logarComFacebook() :Promise<auth.UserCredential>{
    const dadosLogin = new auth.FacebookAuthProvider()
    return this.afauth.auth.signInWithPopup(dadosLogin);
  }
  logar({isCadastro, modoAutenticacao, usuario} : OpcoesAutenticacao){

    let operacao : Promise<auth.UserCredential>

    if(modoAutenticacao == ModoAutenticacao.email){
      operacao = isCadastro ? this.cadastrarComEmail(usuario) : this.loginComEmail(usuario);
    }else {
    operacao = this.logarComFacebook();
      }
    return operacao;

  }
  sair(){
    return this.afauth.auth.signOut();
  }

  get isAutenticado() : Observable<boolean> {
    return this.estadoUsuario$.pipe(
      map(usuario => usuario != null ) 
    )

  }

}

 