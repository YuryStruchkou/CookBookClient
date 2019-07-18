import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateRecipeFormComponent } from './create-update-recipe-form/create-update-recipe-form.component';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
  declarations: [CreateUpdateRecipeFormComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'new', component: CreateUpdateRecipeFormComponent }
    ]),
    CommonComponentsModule
  ]
})
export class RecipeModule { }
