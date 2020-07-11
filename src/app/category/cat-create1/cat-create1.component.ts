import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Category } from '../category.model';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { mimeType } from '../cat-create/mime-type.validator';
import { CategoryLvl1 } from '../categoryLvl1.model';


interface Animal {
  name: string;
  sound: string;
}
@Component({
  selector: 'app-cat-create1',
  templateUrl: './cat-create1.component.html',
  styleUrls: ['./cat-create1.component.css']
})


export class CatCreate1Component implements OnInit {

  form: FormGroup;
  categoryLvl1: CategoryLvl1;
  parentCategory: Category;
  imagePreview: string;

  private mode = 'create';
  private catId: string;
  isLoading = false;
  private catSubs: Subscription;
  categories: Category[] = [];
  constructor(public categoryService: CategoryService, public route: ActivatedRoute) { }

  ngOnInit() {

    this.form = new FormGroup({
      'parentCategory': new FormControl(null, {
        validators: [Validators.required]
      }),
      'title': new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null, {
        validators: [Validators.required]
      }),
      'image': new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });


    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.catId = paramMap.get('id');
        this.isLoading = true;        
        this.getParentCategory();
        this.categoryService.getCategoryLvl1(this.catId).subscribe(catData => {
          this.isLoading = false;
          console.log(catData);
         // this.parentCategory = { id: catData.catId, title: catData.catName, content: '', imagePath: '' };
          this.categoryLvl1 = { id: catData._id, title: catData.title, content: catData.content, imagePath: catData.imagePath, parentCategory :catData.parentCategory};
          console.log(this.categoryLvl1.parentCategory[0]);
          this.form.setValue({
            'title': this.categoryLvl1.title, 'content': this.categoryLvl1.content,
            'image': this.categoryLvl1.imagePath,
            'parentCategory': this.categoryLvl1.parentCategory[0]

          });

        });
      } else {
        this.mode = 'create';
        this.catId = null;
        this.getParentCategory();
      }
    });

  }

  onImgePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }


  getParentCategory()  {
    this.isLoading = true;
    this.categoryService.getCategories();
    this.catSubs = this.categoryService.getCategoryUpdatedListner().subscribe((category: Category[]) => {
      this.isLoading = false;
      this.categories = category;
    })
   
  }

  saveCategory() {

    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      console.log(this.form.value.parentCategory.id);
      this.categoryService.addCategoryLv1(this.form.value.parentCategory.id, this.form.value.parentCategory.title, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    else {
      this.categoryService.updateCategory(this.catId, this.form.value.title, this.form.value.content, this.form.value.image);
    }
    this.form.reset();

  }
}
