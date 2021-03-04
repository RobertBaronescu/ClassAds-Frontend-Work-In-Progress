import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserPasswordComponent } from './components/user-password/user-password.component';
import { UserSettingsComponent } from './components/user-settings/user-settings.component';
import { UserAdsComponent } from './components/user-ads/user-ads.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [UserProfileComponent, UserPasswordComponent, UserSettingsComponent, UserAdsComponent, WishlistComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, ReactiveFormsModule],
})
export class UserModule {}
