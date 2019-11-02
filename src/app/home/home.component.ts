import { Component } from '@angular/core';
import { RecipeNotes } from '../shared/models/recipe-notes.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent {
    private unsubscriber = new Subject();
    private popularRecipes: RecipeNotes[];
    private recentRecipes: RecipeNotes[];

    constructor(private route: ActivatedRoute,
        private router: Router) {
        this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.popularRecipes = this.route.snapshot.data.recipes[0];
                this.recentRecipes = this.route.snapshot.data.recipes[1];
            }
        });
    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
