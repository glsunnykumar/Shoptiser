import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http'

import {Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import { Category } from  "./category.model"

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories :Category[] =[];

  private categoryUpdated = new Subject<Category[]>();

  constructor( private http : HttpClient){

  }
 
  getCategories(){
  this.http.get<{message : string ,categories : any}>('http://localhost:3000/api/cat')
  .pipe(map( (catData)=>{
    return catData.categories.map(cat =>{
      return {
        title : cat.title,
        content : cat.content,
        id :cat._id
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
 
  addCategory(title : string ,content:string){
     const category :Category ={id:null,title , content:content};
     this.http.post<{message : string , catId: string}>('http://localhost:3000/api/cat',category)
     .subscribe((responseData) =>{
       const id= responseData.catId;
       category.id = id;
       console.log(responseData.message);
        window.alert('The category has been added!');
        this.categories.push(category);
        this.categoryUpdated.next([...this.categories]);                                                                
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
