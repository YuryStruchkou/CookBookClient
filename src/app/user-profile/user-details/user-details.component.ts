import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { UserProfile } from 'src/app/shared/models/user-profile.model';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
    private user: UserProfile;
    private unsubscriber = new Subject();

    constructor(private router: Router, private route: ActivatedRoute) {
        this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.user = this.route.snapshot.data.user;
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
