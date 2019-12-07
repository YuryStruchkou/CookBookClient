import { Component, OnInit, ViewChild } from '@angular/core';
import { ImageUploadComponent } from 'src/app/common-components/image-upload/image-upload.component';
import { UserProfile } from 'src/app/shared/models/user-profile.model';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserProfileService } from 'src/app/shared/services/user-profile.service';

@Component({
    selector: 'app-update-user',
    templateUrl: './update-user.component.html',
    styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
    @ViewChild(ImageUploadComponent, { static: false }) imageUploadComponent: ImageUploadComponent;

    private user: UserProfile;
    private errorText: string;
    private unsubscriber = new Subject();

    constructor(private router: Router, 
        private route: ActivatedRoute,
        private userService: UserProfileService) {
        this.router.events.pipe(takeUntil(this.unsubscriber)).subscribe(e => {
            if (e instanceof NavigationEnd) {
                this.user = this.route.snapshot.data.user;
            }
        });
    }

    ngOnInit() {
    }

    onSubmit() {
        this.imageUploadComponent.submit();
    }

    sendRequest(publicId: string) {
        const model = {
            ImagePublicId: publicId || (this.user != null ? this.user.imagePublicId : null)
        };
        const request = this.userService.updateUser(model, this.user.userId);
        request.subscribe({
            next: this.handleSuccess.bind(this),
            error: this.handleError.bind(this)
        });
    }

    private handleSuccess(res: Object) {
        const user = res as UserProfile;
        this.router.navigate(['/user', user.userId]);
    }

    private handleError(errors: any) {
        this.errorText = errors.error.errors[0];
    }

    ngOnDestroy() {
        this.unsubscriber.next();
        this.unsubscriber.complete();
    }
}
