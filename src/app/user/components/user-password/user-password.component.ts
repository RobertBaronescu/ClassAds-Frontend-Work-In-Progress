import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
})
export class UserPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  user: User;
  passwordChanged: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService
  ) {
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.passwordForm = this.formBuilder.group(
      {
        oldPassword: [this.user.password, Validators.required],
        newPassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmedPassword: ['', Validators.required],
      },
      {
        validator: this.MustMatch('newPassword', 'confirmedPassword'),
      }
    );
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

  passwordFormSubmit() {
    if (this.passwordForm.valid) {
      const user = {
        password: this.passwordForm.controls.confirmedPassword.value,
        id: this.user?._id,
      };

      this.userService.changeUserPassword(user).subscribe(() => {
        this.passwordChanged = true;
      });
    }
  }
}
