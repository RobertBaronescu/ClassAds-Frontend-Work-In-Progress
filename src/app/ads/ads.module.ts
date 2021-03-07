import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdListComponent } from './components/ad-list/ad-list.component';
import { AdListItemComponent } from './components/ad-list-item/ad-list-item.component';
import { AdSingleComponent } from './components/ad-single/ad-single.component';
import { AdsRoutingModule } from './ads-routing.module';
import { EditAdComponent } from './components/edit-ad/edit-ad.component';
import { AddAdComponent } from './components/add-ad/add-ad.component';
import { AddEditAdComponent } from './components/add-edit-ad/add-edit-ad.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { SearchPipe } from './pipes/search.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AdListComponent,
    AdListItemComponent,
    AdSingleComponent,
    EditAdComponent,
    AddAdComponent,
    AddEditAdComponent,
    SearchComponent,
    CategoriesComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    NgxDropzoneModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
})
export class AdsModule {}
