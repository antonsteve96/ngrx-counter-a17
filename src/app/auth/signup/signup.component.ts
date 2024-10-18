import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {customEmailValidator, customPasswordValidator} from "../../validators/custom-email.validators";
import {CommonModule, NgIf} from "@angular/common";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {signupStart} from "../state/auth.actions";
import {RootState} from "../../store/root.state";
import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {MatButtonToggle} from "@angular/material/button-toggle";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatButtonToggle,
    MatError,
    MatInput,
    MatLabel,
    MatFormField,
    MatButton,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class SignupComponent implements OnInit{
  private authState = inject(Store<AppState>)
  private sharedState = inject(Store<RootState>)
  signupForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, customEmailValidator()]),
      password: new  FormControl("", [Validators.required,customPasswordValidator() , Validators.minLength(8), Validators.maxLength(16)])
    })
  }

  onSignupFormSubmit() {
    this.sharedState.dispatch(setLoadingSpinner({ status: true }))
    const signupFormValue = this.signupForm.value;
    console.log(signupFormValue);
    this.authState.dispatch(signupStart({registrationRequest: signupFormValue}))

  }

}
