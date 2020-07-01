import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CategoryService } from '../category.service';

@Component({
  selector: 'app-cat-create',
  templateUrl: './cat-create.component.html',
  styleUrls: ['./cat-create.component.css']
})
export class CatCreateComponent implements OnInit {

  enteredTitle ='';

  enteredContent ='';
  

  constructor(public categorySerice : CategoryService) { }

  ngOnInit(): void {
  }

  addCategory( form :NgForm){

    if(form.invalid){
      return ;
    }
 this.categorySerice.addCategory(form.value.title ,form.value.content)

  form.resetForm();

  }
}
