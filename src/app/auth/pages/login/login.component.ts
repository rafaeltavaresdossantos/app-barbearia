import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModoAutenticacao, TipoUsuario } from 'src/app/core/services/auth.types';
import { AuthService } from 'src/app/core/services/auth.service';
import { RecursosService } from 'src/app/core/services/recursos.service';
import { TradutorMessageService } from 'src/app/core/services/tradutor-message.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { HashService } from '../../services/hash.service';
import { Hash } from '../../models/hash';

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
  };
  public modoAutenticacao = ModoAutenticacao;
  private controlNome = new FormControl(
    '',
    [Validators.required]
   );

  private hash: Hash = {
    id: null, tipoUsuario: TipoUsuario.Cliente
  };

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private recursoService: RecursosService,
    private tradutorMessageService: TradutorMessageService,
    private navController: NavController,
    private route: ActivatedRoute,
    private usuarioService: UsuarioService,
    private hashService: HashService
  ) { }

  ngOnInit() {
    this.criaFormulario();
    this.verificaHash();
  }

  verificaHash() {
    const hashParam = this.route.snapshot.queryParamMap.get('hash');
    if (hashParam) {
      this.trocaModoLoginCadastro();
      this.hashService.getHash(hashParam).subscribe(hash => this.hash = hash);
    }
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
        modoAutenticacao,
        usuario: this.loginForm.value
      });

      if (!this.comparaCadEmail.modoLogin) {
        await this.recursoService.toast({message: 'Cadastro realizado com sucessso!', color: 'success'});
        await this.usuarioService.atualizarDadosCadastrais(usuarioLogin.user, this.hash);
        this.hashService.deleteDoc();
      }

      this.navController.navigateForward(this.route.snapshot.queryParamMap.get('redirect') || '/barbearias');
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
