import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Router } from '@angular/router';

@UntilDestroy()
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  userForm: FormGroup;
  user: User;
  imageForm: FormGroup;
  userImage: string;
  imageChanger: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
        this.userForm = new FormGroup({
          name: new FormControl(this.user?.name, Validators.required),
          email: new FormControl({ value: this.user?.email, disabled: true }, [
            Validators.required,
            Validators.email,
          ]),
          phone: new FormControl(this.user?.phone, Validators.required),
        });
      });

    this.imageForm = new FormGroup({
      picture: new FormControl('', Validators.required),
    });
  }

  chooseFile(input: any) {
    input.click();
  }

  userFormSubmit() {
    if (this.userForm.valid) {
      const currentUser: User = {
        ...this.user,
        name: this.userForm.controls.name.value,
        phone: this.userForm.controls.phone.value,
      };

      this.userService.currentUser$.next(currentUser);

      const user = {
        id: currentUser._id,
        name: currentUser.name,
        phone: currentUser.phone,
      };

      this.userService.changeUserNameAndPhone(user).subscribe();
    }
  }

  resetForm() {
    this.userForm.reset({
      email: this.user.email,
    });
  }

  onImagePicked(event: any) {
    const file = event.target.files[0];
    this.imageForm.patchValue({ picture: file });
    this.imageForm?.get('picture')?.updateValueAndValidity();
    const reader = new FileReader();

    reader.onload = () => {
      this.userImage = reader.result as string;
    };

    reader.readAsDataURL(file);
    this.imageChanger = true;
  }

  changePhoto() {
    if (this.imageForm.valid) {
      const user = { id: this.user._id, picture: this.userImage };
      this.userService.changeUserPicture(user).subscribe((user: User) => {
        this.userService.currentUser$.next(user);
        this.imageChanger = false;
        this.imageForm.reset();
        this.user.picture = this.userImage;
      });
    }
  }

  redirectToAddProduct() {
    this.router.navigate(['/ads/add-edit-ad/add']);
  }
}
