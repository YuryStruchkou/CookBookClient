import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from 'src/app/shared/services/recipe.service';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-recipe-main',
    templateUrl: './recipe-main.component.html',
    styleUrls: ['./recipe-main.component.css']
})
export class RecipeMainComponent implements OnInit, OnDestroy {
    private recipe: Recipe;
    private currentUser: User;
    private unsubscriber = new Subject();

    constructor(private recipeService: RecipeService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.recipe = this.route.snapshot.data.recipe;
            }
        });
    }

    ngOnInit() {
    }

    private deleteRecipe() {
        this.recipeService.markRecipeAsDeleted(this.recipe.id).subscribe(() => this.router.navigate(['/recipe', this.recipe.id]));
    }

    private vote(voteValue: number) {
        if (voteValue) {
            this.recipeService.addVote(this.recipe.id, voteValue).subscribe(() => this.router.navigate(['/recipe', this.recipe.id]));
        }
    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
