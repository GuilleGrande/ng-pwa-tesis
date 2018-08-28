import { AuthService } from '../../core/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../auth.styles.css']
})
export class SignupComponent implements OnInit {
  
  signUpForm: FormGroup;
  hide = true;

  constructor(
    public formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.signUpForm = this.formBuilder.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    })
  }

  ngOnInit() {
  }

  get displayName() {
    return this.signUpForm.get('displayName');
  }

  get email() {
      return this.signUpForm.get('email');
  }

  get password () {
    return this.signUpForm.get('password');
  }

  signUp() {
    return this.auth.emailSignUp(this.email.value, this.password.value, this.displayName.value)
            .then(user => {
              if (this.signUpForm.valid) {
                this.router.navigate(['/'])
              }
            })
  }
}
