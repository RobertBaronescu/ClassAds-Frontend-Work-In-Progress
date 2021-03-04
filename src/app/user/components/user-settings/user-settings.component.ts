import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { UserService } from 'src/app/services/user.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  user: User;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentUser$
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.user = user;
      });
  }

  redirectToUserProfile() {
    this.router.navigate([`/user/profile/${this.user._id}`]);
  }

  redirectToUserPassoword() {
    this.router.navigate([`/user/password/${this.user._id}`]);
  }

  redirectToUserAds() {
    this.router.navigate([`user/ads/${this.user._id}`]);
  }
}
