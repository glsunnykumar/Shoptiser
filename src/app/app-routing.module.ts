import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatListComponent } from './category/cat-list/cat-list.component';
import { CatCreateComponent } from './category/cat-create/cat-create.component';


const routes: Routes = [
  {path :'' , component:CatListComponent},
  {path :'create' , component:CatCreateComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
