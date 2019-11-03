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
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [TagsInputComponent, ConfirmModalComponent, CardComponent, CommentsComponent],
    imports: [
        CommonModule,
        MatChipsModule,
        MatIconModule,
        MatFormFieldModule,
        NgbRatingModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [TagsInputComponent, ConfirmModalComponent, CardComponent, CommentsComponent]
})
export class CommonComponentsModule { }
