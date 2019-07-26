import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements OnInit {
    @Input() private question: string;
    @Output() private confirmed = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    private confirm() {
        this.confirmed.emit();
    }
}
