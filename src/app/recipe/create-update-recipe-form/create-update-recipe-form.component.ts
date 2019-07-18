import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-create-update-recipe-form',
    templateUrl: './create-update-recipe-form.component.html',
    styleUrls: ['./create-update-recipe-form.component.css']
})
export class CreateUpdateRecipeFormComponent implements OnInit {

    private createUpdateRecipeForm: FormGroup;

    constructor(private builder: FormBuilder) { }

    ngOnInit() {
        this.createUpdateRecipeForm = this.builder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            content: ['', Validators.required],
            tags: ['']
        });
    }

    get f() { return this.createUpdateRecipeForm.controls }

    onSubmit() {

    }
}
