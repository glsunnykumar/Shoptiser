import { Component, OnInit, ViewChild } from '@angular/core';
import { CategoryLvl1 } from '../categoryLvl1.model';
import { Subscription } from 'rxjs';
import { MatPaginator, MatDialog, MatTableDataSource } from '@angular/material';
import { CategoryService } from '../category.service';
import { ConfirmDialogModel, ConfirmBoxComponent } from 'src/app/common/confirm-box/confirm-box.component';

@Component({
  selector: 'app-cat-lvl1-list',
  templateUrl: './cat-lvl1-list.component.html',
  styleUrls: ['./cat-lvl1-list.component.css']
})
export class CatLvl1ListComponent implements OnInit {

  displayedColumns: string[] = ['parentCategory','imageUrl','Title' ,'Content','action'];
  
  result: string = '';
  categoriesLvl1: CategoryLvl1[] = [];
  private isLoading = false;
  dataSource =null;
  private catSubs: Subscription;
  @ViewChild(MatPaginator,{static: false}) paginator: MatPaginator;


  constructor(public categoryService: CategoryService,public dialog: MatDialog) { }

  ngOnInit() {
    this.isLoading = true;
    this.categoryService.getCategoriesLvl1();
    this.catSubs = this.categoryService.getCategoryLvl1UpdatedListner().subscribe((category: CategoryLvl1[]) => {
      this.isLoading = false;
      this.categoriesLvl1 = category;
     this.dataSource = new MatTableDataSource<CategoryLvl1>(this.categoriesLvl1);
      this.dataSource.paginator = this.paginator;
    })
  }

  confirmDialog(catId: string ,catName:string): void {
    const message = 'Are you sure you want to delete category Level 1?' +catName;
 
    const dialogData = new ConfirmDialogModel("Delete Category Level 1", message);
 
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      maxWidth: "400px",
      data: dialogData
    });
 
    dialogRef.afterClosed().subscribe(dialogResult => {
      console.log(dialogResult)
      if(dialogResult){
      this.categoryService.deleteCategoryLvl1(catId);
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
