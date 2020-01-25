import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModoAutenticacao } from 'src/app/core/services/auth.types';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public comparaCadEmail = {
    modoLogin: true,
    acao: 'Login',
    trocaAcao: 'Cadastro'
  }
  public modoAutenticacao = ModoAutenticacao;
  private controlNome = new FormControl(
    '',
    [Validators.required]
   )

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit() {

    this.criaFormulario();
  }

  // loginform recebe FormBuilder e realiza a validação do campo.
  criaFormulario(){
    this.loginForm = this.fb.group({
      email: ['',[
        Validators.required,
        Validators.email
        ]
      ],
      senha: [ '',[
        Validators.required,
        Validators.minLength(6),
      ]
    ],
      
    })
  }

 async realizarLogin(modoAutenticacao : ModoAutenticacao){

  console.log(modoAutenticacao);
     
    try {
      const usuarioLogin = await this.authService.logar({
        isCadastro: !this.comparaCadEmail.modoLogin, modoAutenticacao: modoAutenticacao, usuario: this.loginForm.value})
        console.log("Entrouuu", usuarioLogin);

    } catch (error) {
      console.log("erro: ",error);
    }
  }

  trocaModoLoginCadastro(){

  this.comparaCadEmail.modoLogin = !this.comparaCadEmail.modoLogin;
  const {modoLogin} = this.comparaCadEmail
  this.comparaCadEmail.acao = modoLogin ? 'Login' : 'Cadastro'
  this.comparaCadEmail.trocaAcao = modoLogin ? 'Criar Conta' : 'Já possuo uma conta'
  
  !modoLogin ? this.loginForm.addControl('nome', this.controlNome ) : this.loginForm.removeControl('nome');

  }
}