import { Component } from '@angular/core';
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {customEmailValidator, customPasswordValidator} from "../../validators/custom-email.validators";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {loginStart} from "../state/auth.actions";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        NgIf,
        ReactiveFormsModule,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({});

  constructor(private authStore: Store<AppState>, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, customEmailValidator()]),
      password: new  FormControl("", [Validators.required,customPasswordValidator() , Validators.minLength(8), Validators.maxLength(16)])
    })

  }

  onLogin() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.authStore.dispatch(loginStart({ email, password}))
    //this.authService.login(email, password);
    console.log("email", email)
    console.log("password", password)
  }

}
