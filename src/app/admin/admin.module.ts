import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { RouterModule } from '@angular/router';
import { AdminGuard } from '../shared/guards/admin.guard';
import { AllUsersResolver } from '../shared/resolvers/all-users-resolver';



@NgModule({
  declarations: [AdminComponent],
  providers: [AllUsersResolver],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminComponent, canActivate: [AdminGuard], resolve: { users: AllUsersResolver }, 
        runGuardsAndResolvers: 'always'}
    ]),
  ]
})
export class AdminModule { }
