import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import { ProductsRoutingModule } from './products-routing.module';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { AddEditAdComponent } from './components/add-edit-ad/add-edit-ad.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductListItemComponent,
    ProductSingleComponent,
    EditAdComponent,
    AddAdComponent,
    AddEditAdComponent,
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProductsModule {}
