import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatListComponent } from './category/cat-list/cat-list.component';
import { CatCreateComponent } from './category/cat-create/cat-create.component';
import { CatCreate1Component } from './category/cat-create1/cat-create1.component';
import { CatLvl1ListComponent } from './category/cat-lvl1-list/cat-lvl1-list.component';


const routes: Routes = [
  {path :'' , component:CatListComponent},
  {path :'create' , component:CatCreateComponent } ,
  {path :'create/lvl1' , component:CatCreate1Component } ,
  {path :'catLvl1' , component:CatLvl1ListComponent } ,
  {path :'edit/:id', component:CatCreateComponent},
  {path :'editLvl1/:id', component:CatCreate1Component},
  {path :'editLvl2/:id', component:CatCreate1Component},
  {path :'editLvl3/:id', component:CatCreate1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
