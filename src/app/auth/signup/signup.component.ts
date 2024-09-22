import { Component } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {customEmailValidator, customPasswordValidator} from "../../validators/custom-email.validators";
import {NgIf} from "@angular/common";

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
  signupForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      firstName: new FormControl("",[Validators.required]),
      lastName: new FormControl("", Validators.required),
      email: new FormControl("", [Validators.required, customEmailValidator()]),
      password: new  FormControl("", [Validators.required,customPasswordValidator() , Validators.minLength(8), Validators.maxLength(16)])
    })
  }

}
