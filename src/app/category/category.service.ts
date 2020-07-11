import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http'

import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Router } from '@angular/router';

import { Category } from "./category.model"
import { CategoryLvl1 } from './categoryLvl1.model';
import { CategoryLvl2 } from './categoryLvl2.model';
import { CategoryLvl3 } from './categrylvl3.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private categories: Category[] = [];
  private categoriesLvl1: CategoryLvl1[] = [];
  private categoriesLvl2: CategoryLvl2[] = [];
  private categoriesLvl3: CategoryLvl3[] = [];

  private categoryUpdated = new Subject<Category[]>();
  private categorylvl1Updated = new Subject<CategoryLvl1[]>();
  private categorylvl2Updated = new Subject<CategoryLvl2[]>();
  private categorylvl3Updated = new Subject<CategoryLvl3[]>();

  constructor(private http: HttpClient, private router: Router) {

  }

  getCategories() {
    this.http.get<{ message: string, categories: any }>('http://localhost:3000/api/cat')
      .pipe(map((catData) => {
        return catData.categories.map(cat => {
          return {
            title: cat.title,
            content: cat.content,
            id: cat._id,
            imagePath: cat.imagePath
          };
        });
      }))
      .subscribe(TransformedcatData => {
        console.log(TransformedcatData);
        this.categories = TransformedcatData;
        this.categoryUpdated.next([...this.categories]);
      });

  }

  getCategoriesLvl1() {
    this.http.get<{ message: string, categorieslvl1: any }>('http://localhost:3000/api/cat/lvl1')
      .pipe(map((cat) => {
        return cat.categorieslvl1.map(cat => {
          return {
            title: cat.categorieslvl1.title,
            content: cat.categorieslvl1.content,
            id: cat.categorieslvl1._id,
            imagePath: cat.categorieslvl1.imagePath,
            parentCategory :cat.categorieslvl1.parentCategory
          };
        })
        }))
      .subscribe(TransformedcatData => {
        console.log(TransformedcatData);
        this.categoriesLvl1 = TransformedcatData;
        this.categorylvl1Updated.next([...this.categoriesLvl1]);
      });

  }

  getCategoryUpdatedListner() {
    return this.categoryUpdated.asObservable();
  }

  getCategoryLvl1UpdatedListner() {
    return this.categorylvl1Updated.asObservable();
  }

  getCategory(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string }>('http://localhost:3000/api/cat/' + id)
  }

  getCategoryLvl1(id: string) {
    return this.http.get<{ _id: string, title: string, content: string, imagePath: string ,parentCategory:Category }>('http://localhost:3000/api/cat/lvl1/' + id)
  }

  addCategory(title: string, content: string, image: File) {
    const categoryData = new FormData();
    categoryData.append("title", title);
    categoryData.append("content", content);
    categoryData.append("image", image, title);
    this.http.post<{ message: string, category: Category }>('http://localhost:3000/api/cat',
      categoryData)
      .subscribe((responseData) => {
        console.log(responseData);
        const category: Category = { id: responseData.category.id, title: title, content: content, imagePath: responseData.category.imagePath };
        console.log(responseData.message);
        window.alert('The category has been added!');
        this.categories.push(category);
        this.categoryUpdated.next([...this.categories]);
        this.router.navigate(["/"]);
      });

  }

  addCategoryLv1(catLvlId: string, catLvlName: string, title: string, content: string, image: File) {
    const categoryData = new FormData();
    categoryData.append("catId", catLvlId);
    categoryData.append("catName", catLvlName);
    categoryData.append("title", title);
    categoryData.append("content", content);
    categoryData.append("image", image, title);
    this.http.post<{ message: string, categorylvl1: CategoryLvl1 }>('http://localhost:3000/api/cat/lvl1',
      categoryData)
      .subscribe((responseData1) => {
        console.log(responseData1.message);
        const categoryLvl: CategoryLvl1 = { id: responseData1.categorylvl1.id, title: title, content: content, imagePath: responseData1.categorylvl1.imagePath, parentCategory: responseData1.categorylvl1.parentCategory };
        window.alert('The category has been added!');
        this.categoriesLvl1.push(categoryLvl);
        this.categorylvl1Updated.next([...this.categoriesLvl1]);
        this.router.navigate(["/catLvl1"]);
      });

  }

  addCategorylv2(catLvl2Id: string, catLvl2Name: string, title: string, content: string, image: File) {
    const categoryData = new FormData();
    categoryData.append("catId", catLvl2Id);
    categoryData.append("catName", catLvl2Name);
    categoryData.append("title", title);
    categoryData.append("content", content);
    categoryData.append("image", image, title);
    this.http.post<{ message: string, categorylvl1: CategoryLvl1 }>('http://localhost:3000/api/cat/lvl1',
      categoryData)
      .subscribe((responseData1) => {
        console.log(responseData1.message);
        // const categoryLvl: CategoryLvl1 = { id: responseData1.categorylvl1.id, title: title, content: content, imagePath: responseData1.categorylvl1.imagePath, catId: catLvl2Id, catName: catLvl2Name };
        // window.alert('The category has been added!');
        // this.categoriesLvl1.push(categoryLvl);
        // this.categorylvl1Updated.next([...this.categoriesLvl1]);
        // this.router.navigate(["/catLvl1"]);
      });

  }

  addCategorylv3(catLvl3Id: string, catLvl3Name: string, title: string, content: string, image: File) {
    const categoryData = new FormData();
    categoryData.append("catId", catLvl3Id);
    categoryData.append("catName", catLvl3Name);
    categoryData.append("title", title);
    categoryData.append("content", content);
    categoryData.append("image", image, title);
    this.http.post<{ message: string, categorylvl1: CategoryLvl1 }>('http://localhost:3000/api/cat/lvl3',
      categoryData)
      .subscribe((responseData1) => {
        console.log(responseData1.message);
        // const categoryLvl: CategoryLvl1 = { id: responseData1.categorylvl1.id, title: title, content: content, imagePath: responseData1.categorylvl1.imagePath, catId: catLvl3Id, catName: catLvl3Name };
        // window.alert('The category has been added!');
        // this.categoriesLvl1.push(categoryLvl);
        // this.categorylvl1Updated.next([...this.categoriesLvl1]);
        // this.router.navigate(["/catLvl1"]);
      });

  }

  updateCategory(id: string, title: string, content: string, image: File | string) {
    console.log('updating category');
    let catData: Category | FormData;
    if (typeof (image) === 'object') {

      catData = new FormData();
      catData.append("id", id);
      catData.append("title", title);
      catData.append("content", content);
      catData.append("image", image, title);

    } else {
      catData = {
        id: id,
        title: title,
        content: content,
        imagePath: image
      }
    }
    this.http.put('http://localhost:3000/api/cat/' + id, catData)
      .subscribe(response => {
        console.log('updating object done');
        const updatedCat = [...this.categories];
        const oldPost = updatedCat.findIndex(p => p.id === id);
        const cat: Category = {
          id: id,
          title: title,
          content: content,
          imagePath: "response.imagePath"
        }
        updatedCat[oldPost] = cat;
        this.categories = updatedCat;
        this.categoryUpdated.next([...this.categories]);
        this.router.navigate(["/"]);
      });
  }

  deleteCategory(id: string) {
    this.http.delete('http://localhost:3000/api/cat/' + id)
      .subscribe(() => {
        const updatedCat = this.categories.filter(cat => cat.id != id);
        this.categories = updatedCat;
        this.categoryUpdated.next([...this.categories]);
        console.log('Deleted !');
      })
  }

  deleteCategoryLvl1(id: string) {
    this.http.delete('http://localhost:3000/api/cat/lvl1' + id)
      .subscribe(() => {
        const updatedCat = this.categoriesLvl1.filter(cat => cat.id != id);
        this.categoriesLvl1 = updatedCat;
        this.categorylvl1Updated.next([...this.categoriesLvl1]);
        console.log('Deleted !');
      })
  }

  deleteCategoryLvl2(id: string) {
    this.http.delete('http://localhost:3000/api/cat/lvl2' + id)
      .subscribe(() => {
        const updatedCat = this.categoriesLvl2.filter(cat => cat.id != id);
        this.categoriesLvl2 = updatedCat;
        this.categorylvl2Updated.next([...this.categoriesLvl2]);
      })
  }

  deleteCategoryLvl3(id: string) {
    this.http.delete('http://localhost:3000/api/cat/lvl3' + id)
      .subscribe(() => {
        const updatedCat = this.categoriesLvl3.filter(cat => cat.id != id);
        this.categoriesLvl3 = updatedCat;
        this.categorylvl3Updated.next([...this.categoriesLvl3]);
      })
  }

}


