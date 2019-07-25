import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { MatChipsModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TagsInputComponent],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    RouterModule
  ],
  exports: [TagsInputComponent]
})
export class CommonComponentsModule { }
