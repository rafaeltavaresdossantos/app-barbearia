import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

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

}
