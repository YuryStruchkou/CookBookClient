import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { UserDetailsResolver } from '../shared/resolvers/user-details.resolver';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonComponentsModule } from '../common-components/common-components.module';

@NgModule({
    declarations: [UserDetailsComponent],
    providers: [UserDetailsResolver],
    imports: [
        CommonModule,
        NgbRatingModule,
        RouterModule.forChild([
            { path: ':id', component: UserDetailsComponent, resolve: { user: UserDetailsResolver }, runGuardsAndResolvers: 'always' },
        ]),
        CommonComponentsModule,
    ]
})
export class UserProfileModule { }
