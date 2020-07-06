import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatListComponent } from './category/cat-list/cat-list.component';
import { CatCreateComponent } from './category/cat-create/cat-create.component';
import { CatCreate1Component } from './category/cat-create1/cat-create1.component';


const routes: Routes = [
  {path :'' , component:CatListComponent},
  {path :'create' , component:CatCreateComponent } ,
  {path :'create/lvl1' , component:CatCreate1Component } ,
  {path :'edit/:id', component:CatCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
