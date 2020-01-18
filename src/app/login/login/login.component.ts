import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

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
  private controlNome = new FormControl(
    '',
    [Validators.required]
   )

  constructor(
    private fb: FormBuilder
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

  realizarLogin(){
    console.log("entrou",this.loginForm.value);
  }

  trocaModoLoginCadastro(){

  this.comparaCadEmail.modoLogin = !this.comparaCadEmail.modoLogin;
  const {modoLogin} = this.comparaCadEmail
  this.comparaCadEmail.acao = modoLogin ? 'Login' : 'Cadastro'
  this.comparaCadEmail.trocaAcao = modoLogin ? 'Criar Conta' : 'Já possuo uma conta'
  
  !modoLogin ? this.loginForm.addControl('nome', this.controlNome ) : this.loginForm.removeControl('nome');

  }
}