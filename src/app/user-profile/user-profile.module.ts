import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { UserDetailsResolver } from '../shared/resolvers/user-details.resolver';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponentsModule } from '../common-components/common-components.module';
import { CloudinaryConfiguration, CloudinaryModule } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import { UpdateUserComponent } from './update-user/update-user.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [UserDetailsComponent, UpdateUserComponent],
    providers: [UserDetailsResolver],
    imports: [
        CommonModule,
        NgbRatingModule,
        FormsModule,
        RouterModule.forChild([
            { path: ':id', component: UserDetailsComponent, resolve: { user: UserDetailsResolver }, runGuardsAndResolvers: 'always' },
            { path: ':id/update', component: UpdateUserComponent, canActivate: [AuthGuard], data: { 'update': true },
             resolve: { user: UserDetailsResolver }, runGuardsAndResolvers: 'always' },
        ]),
        CloudinaryModule.forRoot({Cloudinary}, { cloud_name: "dhyutbotf" } as CloudinaryConfiguration),
        CommonComponentsModule,
    ]
})
export class UserProfileModule { }
