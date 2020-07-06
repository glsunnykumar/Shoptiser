import { Component, OnInit } from '@angular/core';
import {  FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';


import { CategoryService } from '../category.service';
import { Category } from '../category.model';
import {mimeType} from './mime-type.validator';
@Component({
  selector: 'app-cat-create',
  templateUrl: './cat-create.component.html',
  styleUrls: ['./cat-create.component.css']
})
export class CatCreateComponent implements OnInit {

  enteredTitle = '';

  enteredContent = '';
  category : Category;
  form:FormGroup;
  imagePreview: string;

  private mode = 'create';
  private catId: string;
  isLoading =false;


  constructor(public categorySerice: CategoryService, public route: ActivatedRoute) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      'title' : new FormControl(null,{
        validators: [Validators.required,Validators.minLength(3)]
      }),
      'content' : new FormControl(null ,{
        validators :[Validators.required]
      }) ,
      'image' :new FormControl(null,{validators:[Validators.required],asyncValidators :[mimeType]})
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.catId = paramMap.get('id');
        this.isLoading =true;
       this.categorySerice.getCategory(this.catId).subscribe(catData =>{
        this.isLoading =false;
         this.category ={id : catData._id,title :catData.title ,content :catData.content,imagePath :catData.imagePath};
         this.form.setValue({
           'title':this.category.title ,'content': this.category.content,
           'image':this.category.imagePath
           
          });
       });
      } else {
        this.mode = 'create';
        this.catId = null;
      }
    });
  }

  onImgePicked(event:Event){
    const file =(event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload =() =>{
        this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  saveCategory() {

    if (this.form.invalid) {
      return;
    }
    this.isLoading =true;
    if(this.mode  === 'create'){
      console.log(this.form.value.image)
    this.categorySerice.addCategory(this.form.value.title, this.form.value.content,this.form.value.image);
    }
    else{
      this.categorySerice.updateCategory(this.catId,this.form.value.title, this.form.value.content,this.form.value.image);
    }
    this.form.reset();

  }
}
