import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RouterModule } from '@angular/router';
import { UserDetailsResolver } from '../shared/resolvers/user-details.resolver';

@NgModule({
    declarations: [UserDetailsComponent],
    providers: [UserDetailsResolver],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: ':id', component: UserDetailsComponent, resolve: { user: UserDetailsResolver }, runGuardsAndResolvers: 'always' },
        ]),
    ]
})
export class UserProfileModule { }
