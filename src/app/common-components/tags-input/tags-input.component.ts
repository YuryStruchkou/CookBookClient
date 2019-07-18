import { Component, Input, Output, EventEmitter } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
    selector: 'app-tags-input',
    templateUrl: './tags-input.component.html',
    styleUrls: ['./tags-input.component.css']
})
export class TagsInputComponent {
    @Input() private selectable: boolean;
    @Input() private removable: boolean;
    @Output() onChanged = new EventEmitter<string[]>();
    private readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    private tags: string[] = [];

    add(event: MatChipInputEvent) {
        const input = event.input;
        const value = event.value;
        if ((value || '').trim()) {
            this.tags.push(value.trim());
        }
        if (input) {
            input.value = '';
        }
        this.onChanged.emit(this.tags);
    }

    remove(tag: string) {
        const index = this.tags.indexOf(tag);
        if (index >= 0) {
            this.tags.splice(index, 1);
        }
        this.onChanged.emit(this.tags);
    }
}
