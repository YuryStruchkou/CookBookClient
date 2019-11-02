import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
    selector: 'app-tags-input',
    templateUrl: './tags-input.component.html',
    styleUrls: ['./tags-input.component.css']
})
export class TagsInputComponent implements OnInit {
    @Input() private selectable: boolean;
    @Input() private removable: boolean;
    @Input() private initialTags: string[];
    @Input() private readonly: boolean = false;
    @Input() private routerLinkPath: string;
    @Input() private queryParamName: string;
    @Output() onChanged = new EventEmitter<string[]>();
    private readonly separatorKeysCodes: number[] = [ENTER, COMMA];
    private tags: string[];

    ngOnInit() {
        this.tags = this.initialTags || [];
    }

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
