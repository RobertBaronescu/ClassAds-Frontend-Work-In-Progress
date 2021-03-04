import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAdsComponent } from './components/user-ads/user-ads.component';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'profile/:userId',
    component: UserProfileComponent,
  },
  {
    path: 'password/:userId',
    component: UserPasswordComponent,
  },
  { path: 'ads/:userId', component: UserAdsComponent },
  { path: 'wishlist/:userId', component: WishlistComponent },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
