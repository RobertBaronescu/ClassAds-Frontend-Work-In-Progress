import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/interfaces/category.interface';
import { CategoryService } from 'src/app/services/category.service';
import { UserService } from 'src/app/services/user.service';
import { Ad } from 'src/app/interfaces/ad.interface';
import { AdService } from 'src/app/services/ad.service';
import { User } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';
import { Subcategory } from 'src/app/interfaces/subcategory.interface';

@Component({
  selector: 'app-add-edit-ad',
  templateUrl: './add-edit-ad.component.html',
  styleUrls: ['./add-edit-ad.component.scss'],
})
export class AddEditAdComponent implements OnInit {
  @Input() set isEditing(value: boolean) {
    this._isEditing = value;
    if (this._isEditing) {
      this.adService
        .getAd(this.adService.currentAdId$.getValue())
        .subscribe((ad) => {
          this.adId = ad._id;
          this.addAdForm.patchValue(ad);
          ad.photos.forEach((photo) => {
            this.convertBase64ToArrayBuffer(photo, this.files);
          });

          this.convertBase64ToArrayBuffer(ad.thumbnail, this.thumbnailFiles);
        });
    }
  }

  addAdForm: FormGroup;
  categories: Category[];
  thumbnailFiles: File[] = [];
  files: File[] = [];
  user: User;
  booleanArray = [false, true];
  _isEditing: boolean;
  adId: string;
  subcategories: Subcategory[];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private userService: UserService,
    private adService: AdService,
    private router: Router
  ) {
    this.categoryService.getCategories().subscribe((categories) => {
      this.categories = [...categories];
      this.userService.currentUser$.subscribe((user) => {
        this.user = user;
      });
      this.categoryService
        .getSubcategories(this.categories[0]._id)
        .subscribe((subcategories) => {
          this.subcategories = [...subcategories];
          this.addAdForm = this.formBuilder.group({
            title: ['', Validators.required],
            price: [null, Validators.required],
            thumbnail: ['', Validators.required],
            description: ['', Validators.required],
            photos: [[]],

            category: [String(this.categories[0].name)],

            subcategory: [String(this.subcategories[0]?.name)],
            sponsored: [false],
            views: [],
          });
        });
    });
  }

  ngOnInit(): void {}

  onThumbnailSelect(event: any) {
    const file = event.addedFiles[0];
    const reader = new FileReader();

    this.thumbnailFiles = [file];

    reader.onload = () => {
      this.addAdForm.patchValue({ thumbnail: reader.result as string });
      this.addAdForm?.controls.thumbnail?.updateValueAndValidity();
    };

    reader.readAsDataURL(this.thumbnailFiles[0]);
  }

  onSelect(event: any) {
    const photoResults: string[] = [];
    this.files.push(...event.addedFiles);

    this.files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        photoResults.push(String(reader.result));

        this.addAdForm.controls.photos?.updateValueAndValidity;
      };
      reader.readAsDataURL(file);
    });
    this.addAdForm.patchValue({ photos: photoResults });
  }

  onRemove(event: any) {
    const photoResults: string[] = [];

    this.files.splice(this.files.indexOf(event), 1);
    this.files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        photoResults.push(String(reader.result));

        this.addAdForm.controls.photos?.updateValueAndValidity;
      };
      reader.readAsDataURL(file);
    });
    this.addAdForm.patchValue({ photos: photoResults });
  }

  onThumbnailRemove(event: any) {
    this.thumbnailFiles.splice(this.thumbnailFiles.indexOf(event), 1);
    this.addAdForm.patchValue({ thumbnail: '' });
  }

  convertDataURIToBinary(dataURI: string) {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));

    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }

  convertBase64ToArrayBuffer(photo: string, filesArray: File[]) {
    const arrayBufferFromBase64 = this.convertDataURIToBinary(photo);
    const imageAsFile = new File([arrayBufferFromBase64], `Room photo`, {
      type: 'image/png',
    });

    filesArray.push(imageAsFile);
  }

  formSubmit() {
    let foundCategory: Category;
    this.categories.forEach((element: Category) => {
      if (element.name === this.addAdForm.controls.category.value) {
        foundCategory = element;
      }
    });

    let foundSubcategory: Subcategory;
    this.subcategories.forEach((element: Subcategory) => {
      if (element.name === this.addAdForm.controls.subcategory.value) {
        foundSubcategory = element;
      }
    });

    if (!this._isEditing) {
      const ad: Ad = {
        title: this.addAdForm.controls.title.value,
        price: this.addAdForm.controls.price.value,
        thumbnail: this.addAdForm.controls.thumbnail.value,
        description: this.addAdForm.controls.description.value,
        photos: this.addAdForm.controls.photos.value,
        userId: String(this.user._id),
        categoryId: foundCategory._id,
        subcategoryId: foundSubcategory._id,
        sponsored: this.addAdForm.controls.sponsored.value,
        views: 0,
      };

      this.adService.createAd(ad).subscribe(() => {
        this.router.navigate([`/user/ads/${this.user._id}`]);
      });
    } else {
      const ad: Ad = {
        ...this.addAdForm.value,
        userId: String(this.user._id),
        categoryId: foundCategory._id,
        subcategoryId: foundSubcategory._id,
        _id: this.adId,
      };
      this.adService.editAd(ad).subscribe(() => {
        this.router.navigate([`/user/ads/${this.user._id}`]);
      });
    }
  }

  onChange(value) {
    this.addAdForm.patchValue({ sponsored: value });
  }

  getSubcategories(event) {
    this.categoryService
      .getSubcategories(String(this.categories[event.target.selectedIndex]._id))
      .subscribe((subcategories) => {
        this.subcategories = [...subcategories];
      });
  }
}
