import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import { Router } from '@angular/router';

import { Category } from  "./category.model"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories :Category[] =[];

  private categoryUpdated = new Subject<Category[]>();

  constructor( private http : HttpClient ,private router: Router){

  }
 
  getCategories(){
  this.http.get<{message : string ,categories : any}>('http://localhost:3000/api/cat')
  .pipe(map( (catData)=>{
    return catData.categories.map(cat =>{
      return {
        title : cat.title,
        content : cat.content,
        id :cat._id,
        imagePath :cat.imagePath
      };
    });
  }))
  .subscribe(TransformedcatData=>{
    this.categories =TransformedcatData;
    this.categoryUpdated.next([...this.categories]);
  });
   
  }
 
  getCategoryUpdatedListner(){
   return  this.categoryUpdated.asObservable();
  }

  getCategory(id : string){
    return this.http.get<{_id:string , title: string , content :string,imagePath:string}>('http://localhost:3000/api/cat/'+id)
  }
 
  addCategory(title : string ,content:string,image : File){
     const categoryData = new FormData();
     categoryData.append("title",title);
     categoryData.append("content",content);
     categoryData.append("image",image,title);
     this.http.post<{message : string , category: Category}>('http://localhost:3000/api/cat',
     categoryData)
     .subscribe((responseData) =>{
       const category : Category = {id : responseData.category.id , title : title ,content :content ,imagePath : responseData.category.imagePath};
       console.log(responseData.message);
        window.alert('The category has been added!');
        this.categories.push(category);
        this.categoryUpdated.next([...this.categories]); 
        this.router.navigate(["/"]);                                                               
     });
    
  }

  updateCategory(id : string, title:string, content : string ,image :File | string){
    console.log('updating category');
    let catData : Category | FormData ;
    if(typeof(image) === 'object'){
     
     catData = new FormData();
     catData.append("id",id);
     catData.append("title",title);
     catData.append("content",content);
     catData.append("image",image,title);

    }else{
      catData ={
       id : id,
       title : title,
       content:content,
       imagePath: image
     }
    }
    this.http.put('http://localhost:3000/api/cat/'+id,catData)
    .subscribe(response => {
      console.log('updating object done');
      const updatedCat = [...this.categories];
      const oldPost = updatedCat.findIndex( p => p.id === id);
      const cat : Category ={
        id : id,
        title : title,
        content:content,
        imagePath: "response.imagePath"
      }
      updatedCat[oldPost] = cat;
      this.categories =updatedCat;
      this.categoryUpdated.next([...this.categories]) ;
      this.router.navigate(["/"]);   
    });
  }

  deleteCategory(id : string){
    this.http.delete('http://localhost:3000/api/cat/'+id)
    .subscribe(()=>{
      const updatedCat =this.categories.filter(cat => cat.id != id);
      this.categories = updatedCat;
      this.categoryUpdated.next([...this.categories]);
      console.log('Deleted !');
    })
  }
}
