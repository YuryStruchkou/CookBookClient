import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateUpdateRecipeFormComponent } from './create-update-recipe-form/create-update-recipe-form.component';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { AuthGuard } from '../shared/guards/auth.guard';
import { RecipeMainComponent } from './recipe-main/recipe-main.component';
import { RecipeDetailResolver } from '../shared/resolvers/recipe-detail.resolver';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';

@NgModule({
  declarations: [CreateUpdateRecipeFormComponent, RecipeMainComponent],
  providers: [RecipeDetailResolver],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbRatingModule,
    RouterModule.forChild([
      { path: 'new', component: CreateUpdateRecipeFormComponent, canActivate: [AuthGuard] },
      { path: ':id', component: RecipeMainComponent, resolve: { recipe: RecipeDetailResolver }, runGuardsAndResolvers: 'always' },
      { path: ':id/update', component: CreateUpdateRecipeFormComponent, canActivate: [AuthGuard], data: { 'update': true }, 
        resolve: { recipe: RecipeDetailResolver }}
    ]),
    CloudinaryModule.forRoot({Cloudinary}, { cloud_name: "dhyutbotf" } as CloudinaryConfiguration),
    CommonComponentsModule
  ]
})
export class RecipeModule { }
