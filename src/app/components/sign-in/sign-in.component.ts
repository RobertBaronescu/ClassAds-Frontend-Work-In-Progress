import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  signInForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.authService.showHeaderAndFooter.next(false);
  }

  signInFormSubmit() {
    if (this.signInForm.valid) {
      const user = {
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      };

      this.authService
        .signIn(user)
        .pipe(
          tap(() => {
            this.router.navigate(['/']);
          })
        )
        .subscribe((loggedUser) => {
          this.userService.currentUser$.next(loggedUser);
        });
    }
  }
}
