import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateRecipeFormComponent } from './create-update-recipe-form/create-update-recipe-form.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RecipeMainComponent } from './recipe-main/recipe-main.component';
import { RecipeDetailResolver } from '../shared/resolvers/recipe-detail.resolver';

@NgModule({
  declarations: [CreateUpdateRecipeFormComponent, RecipeMainComponent],
  providers: [RecipeDetailResolver],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: 'new', component: CreateUpdateRecipeFormComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeMainComponent, resolve: { recipe: RecipeDetailResolver } },
      { path: ':id/update', component: CreateUpdateRecipeFormComponent, canActivate: [AuthGuard], data: { 'update': true }, 
        resolve: { recipe: RecipeDetailResolver }}
    ]),
    CommonComponentsModule
  ]
})
export class RecipeModule { }
