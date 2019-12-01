import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { UserProfile } from 'src/app/shared/models/user-profile.model';
import { takeUntil } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
    private unsubscriber = new Subject();
    private currentUser: User;    
    private users: UserProfile[];    
    private errorText: string;
    private activeStatus = UserStatuses.ACTIVE;
    private deletedStatus = UserStatuses.DELETED;

    constructor(private userService: UserProfileService,
        private authService: AuthService,
        private route: ActivatedRoute,
        private router: Router) {
        this.authService.currentUser.subscribe(user => {
            this.currentUser = user;
        });
        this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.users = this.route.snapshot.data.users;
            }
        });
    }

    ngOnInit() {
    }

    private blockUser(id: number) {
        this.userService.blockUser(id).subscribe({
            next: this.handleSuccessfulAction.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private handleSuccessfulAction(res: Object) {
        let user = res as UserProfile;
        let index = this.users.findIndex(u => u.userId == user.userId);
        this.users[index] = user;
        this.errorText = "";
    }

    private handleError(errors: any) {
        this.errorText = errors.error.errors[0];
    }

    private muteUser(id: number) {
        this.userService.muteUser(id).subscribe({
            next: this.handleSuccessfulAction.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private restoreUser(id: number) {
        this.userService.restoreUser(id).subscribe({
            next: this.handleSuccessfulAction.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private deleteUser(id: number) {
        this.userService.markUserAsDeleted(id).subscribe({
            next: this.handleSuccessfulAction.bind(this),
            error: this.handleError.bind(this)
        });
    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
