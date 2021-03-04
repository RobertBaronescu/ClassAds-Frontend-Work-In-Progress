import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: ['./sign-out.component.scss'],
})
export class SignOutComponent implements OnInit {
  signOutForm: FormGroup;
  defaultImageSrc: string =
    'https://cdn3.iconfinder.com/data/icons/random-icon-set/512/user-512.png';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.signOutForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        phone: ['', Validators.required],
        confirmedPassword: ['', Validators.required],
      },
      {
        validator: this.MustMatch('password', 'confirmedPassword'),
      }
    );
    this.authService.showHeaderAndFooter.next(false);
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registerUser() {
    if (this.signOutForm.valid) {
      const newUser: User = {
        name: this.signOutForm.controls.name.value as string,
        email: this.signOutForm.controls.email.value as string,
        password: this.signOutForm.controls.password.value as string,
        phone: this.signOutForm.controls.phone.value as string,
        picture: this.defaultImageSrc as string,
        wishlist: [],
      };

      this.authService.signUp(newUser).subscribe((response) => {
        const user = response._doc;
        this.userService.currentUser$.next(user);
      });
      this.router.navigate(['/']);
    }
  }
}
