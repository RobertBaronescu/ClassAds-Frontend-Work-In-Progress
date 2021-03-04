import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-icon',
  templateUrl: './user-icon.component.html',
  styleUrls: ['./user-icon.component.scss'],
})
export class UserIconComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }

  logOut() {
    this.authService.signOut();
    this.userService.currentUser$.next(null);
  }

  redirectToUserProfile() {
    const userId = this.userService.currentUser$.getValue()._id;
    this.router.navigate([`/user/profile/${userId}`]);
  }

  redirectToWishlist() {
    const userId = this.userService.currentUser$.getValue()._id;

    this.router.navigate([`/user/wishlist/${userId}`]);
  }
}
