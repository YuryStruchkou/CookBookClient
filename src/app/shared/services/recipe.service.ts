import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    private recipeEndpoint = AppConfigService.settings.apiEndpoints.recipe;

    constructor(private repository: RepositoryService) { }

    public createRecipe(body: any) {
        return this.repository.post(this.recipeEndpoint, body);
    }

    public getRecipe(id: number) {
        return this.repository.get(this.recipeEndpoint + id);
    }

    public updateRecipe(body: any, id: number) {
        return this.repository.put(this.recipeEndpoint + id, body);
    }

    public markRecipeAsDeleted(id: number) {
        return this.repository.delete(this.recipeEndpoint + id);
    }
}
