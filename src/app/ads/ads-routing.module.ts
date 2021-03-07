import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AddEditAdComponent } from './components/add-edit-ad/add-edit-ad.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AuthGuard } from '../shared/auth.guard';
import { AdSingleComponent } from './components/ad-single/ad-single.component';

const routes: Routes = [
  {
    path: 'list/:categoryId',
    component: AdListComponent,
  },
  { path: ':id', component: AdSingleComponent },
  {
    path: 'add-edit-ad/add',
    component: AddAdComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'add-edit-ad/edit/:adId',
    component: EditAdComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdsRoutingModule {}
