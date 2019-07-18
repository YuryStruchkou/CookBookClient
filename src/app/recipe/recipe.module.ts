import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateUpdateRecipeFormComponent } from './create-update-recipe-form/create-update-recipe-form.component';



@NgModule({
  declarations: [CreateUpdateRecipeFormComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: 'new', component: CreateUpdateRecipeFormComponent }
    ])
  ]
})
export class RecipeModule { }
