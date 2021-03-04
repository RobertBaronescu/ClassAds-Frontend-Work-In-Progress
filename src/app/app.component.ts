import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { UserService } from './services/user.service';
import { User } from './interfaces/user.interface';
import { Token } from './interfaces/token.interface';

const PAGES_WITH_NO_SIDEBAR_AND_FOOTER: string[] = ['login', 'register'];

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'class-ads';
  showHeaderAndFooter: boolean;

  constructor(
    public authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {
    this.router.events.pipe(untilDestroyed(this)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const routeParts: string[] = this.router.url.split('/');
        this.showHeaderAndFooter = !PAGES_WITH_NO_SIDEBAR_AND_FOOTER.some(
          (page) => routeParts.includes(page)
        );
      }
    });
  }
  ngOnInit(): void {
    const token = localStorage.getItem('access_token');

    const payload: Token = { value: token };

    if (token) {
      this.userService.verifyUser(payload).subscribe((user: User) => {
        this.userService.currentUser$.next(user);
      });
    }
  }
}
