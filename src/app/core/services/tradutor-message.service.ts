import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TradutorMessageService {

  constructor() { }

  traduzirMensagem(core){
    switch(core){
      case 'auth/user-not-found' :
        return 'E-mail não cadastrado!'
      case 'auth/wrong-password' :
        return 'Senha incorreta, tente novamente!'
      case 'auth/email-already-in-use' :
        return 'O endereço de email já está sendo usado por outra conta!'
      case 'auth/too-many-requests' :
        return 'Muitas tentativas de login sem êxito. Por favor, tente novamente mais tarde.'    
    }
  }
}

