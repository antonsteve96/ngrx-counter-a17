import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {customEmailValidator, customPasswordValidator} from "../../validators/custom-email.validators";
import {NgIf} from "@angular/common";
import {AppState} from "../../store/app.state";
import {Store} from "@ngrx/store";
import {signupStart} from "../state/auth.actions";
import {RootState} from "../../store/root.state";
import {setLoadingSpinner} from "../../store/shared/shared.actions";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
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
