import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { MatChipsModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { CardComponent } from './card/card.component';
import { NgbRatingModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [TagsInputComponent, ConfirmModalComponent, CardComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    NgbRatingModule,
    RouterModule
  ],
  exports: [TagsInputComponent, ConfirmModalComponent, CardComponent]
})
export class CommonComponentsModule { }
