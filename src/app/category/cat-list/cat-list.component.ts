import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmBoxComponent,ConfirmDialogModel}from '../../common/confirm-box/confirm-box.component'


import { CategoryService } from '../category.service';
import { Category } from '../category.model';

// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];


@Component({
  selector: 'app-cat-list',
  templateUrl: './cat-list.component.html',
  styleUrls: ['./cat-list.component.css']
})




export class CatListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['imageUrl','Title' ,'Content','action'];
  
  result: string = '';
 
  categories: Category[] = [];
  private isLoading = false;
 
 
  private catSubs: Subscription;
 

  constructor(public categoryService: CategoryService,public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.categoryService.getCategories();
    this.catSubs = this.categoryService.getCategoryUpdatedListner().subscribe((category: Category[]) => {
      this.isLoading = false;
      this.categories = category;
      console.log(this.categories);
    })
  }

  confirmDialog(catId: string ,catName:string): void {
    const message = 'Are you sure you want to delete category?' +catName;
 
    const dialogData = new ConfirmDialogModel("Delete Category", message);
 
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult){
      this.categoryService.deleteCategory(catId);
      }
    });
  }

 
  onDelete(catId: string){
    //this.categoryService.deleteCategory(catId);
  }

  ngOnDestroy() {
    this.catSubs.unsubscribe();
  }

}

export class DialogContentExampleDialog {}
