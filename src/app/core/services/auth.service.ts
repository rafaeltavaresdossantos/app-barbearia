import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {auth} from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afauth: AngularFireAuth
  ) { }

  //funcao responsavel por receber os dados do formulario extraindo apenas email e senha e realizando a autenticao por email e senha.
  loginComEmail({email,senha}) :Promise<auth.UserCredential>{
    return this.afauth.auth.signInWithEmailAndPassword(email,senha);
  }

  //funcao responsavel por cadastar o usuario no firebase, se o retorno for bem sucedido autoriza a inclusão do nome
  cadastrarComEmail({email,senha,nome}) :Promise<auth.UserCredential>{
    return this.afauth.auth.createUserWithEmailAndPassword(email,senha)
      .then(res => {
        return res.user.updateProfile({
          displayName: nome,
          photoURL: null,
        }).then( () => res )
      })

  }
  logarComFacebook() :Promise<auth.UserCredential>{
    const dadosLogin = new auth.FacebookAuthProvider()
    return this.afauth.auth.signInWithPopup(dadosLogin);
  }
}

 