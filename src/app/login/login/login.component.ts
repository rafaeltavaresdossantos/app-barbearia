import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModoAutenticacao } from 'src/app/core/services/auth.types';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecursosService } from 'src/app/core/services/recursos.service';
import { TradutorMessageService } from 'src/app/core/services/tradutor-message.service';
import { Routes, RouterModule, Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { url } from 'inspector';

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
   );

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private recursoService: RecursosService,
    private tradutorMessageService: TradutorMessageService,
    private router: Router,
    private navController: NavController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.criaFormulario();
  }

  // loginform recebe FormBuilder e realiza a validação do campo.
  criaFormulario() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email
        ]
      ],
      senha: [ '', [
        Validators.required,
        Validators.minLength(6),
      ]
    ],

    });
  }

 async realizarLogin(modoAutenticacao: ModoAutenticacao) {
  const modoCarregando = await this.recursoService.loading();
  try {
      const usuarioLogin = await this.authService.logar({
        isCadastro: !this.comparaCadEmail.modoLogin,
        modoAutenticacao: modoAutenticacao,
        usuario: this.loginForm.value
      });

      if (!this.comparaCadEmail.modoLogin) {
        await this.recursoService.toast({message: 'Cadastro realizado com sucessso!', color: 'success'});
      }
      this.navController.navigateForward(this.route.snapshot.queryParamMap.get('url') || '/barbearias')
    } catch (error) {
        console.log(error);
        await this.recursoService.toast({message: this.tradutorMessageService.traduzirMensagem(error.code)});
    } finally {
      modoCarregando.dismiss();
    }
  }

  trocaModoLoginCadastro() {

  this.comparaCadEmail.modoLogin = !this.comparaCadEmail.modoLogin;
  const {modoLogin} = this.comparaCadEmail;
  this.comparaCadEmail.acao = modoLogin ? 'Login' : 'Cadastro';
  this.comparaCadEmail.trocaAcao = modoLogin ? 'Criar Conta' : 'Já possuo uma conta';

  !modoLogin ? this.loginForm.addControl('nome', this.controlNome ) : this.loginForm.removeControl('nome');

  }
}
