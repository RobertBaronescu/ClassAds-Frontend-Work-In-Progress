import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import { AddEditAdComponent } from './components/add-edit-ad/add-edit-ad.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AuthGuard } from '../shared/auth.guard';

const routes: Routes = [
  {
    path: 'list/:categoryId',
    component: ProductsListComponent,
  },
  { path: ':id', component: ProductSingleComponent },
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
export class ProductsRoutingModule {}
