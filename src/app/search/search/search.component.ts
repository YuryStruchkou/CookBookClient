import { Component, OnInit } from '@angular/core';
import { RecipeNotes } from 'src/app/shared/models/recipe-notes.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NavigationEnd, ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
    private recipes: RecipeNotes[];
    private page: number;
    private query: string;
    private unsubscriber = new Subject();

    constructor(private route: ActivatedRoute,
        private router: Router) {
        this.route.queryParams.subscribe(params => {
            this.page = parseInt(params["page"]) || 1;
            this.query = params["query"];
        });
        this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.recipes = this.route.snapshot.data.recipes;
            }
        });
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
