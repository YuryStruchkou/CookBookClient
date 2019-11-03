import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Comment } from 'src/app/shared/models/comment.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/shared/services/comment.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    @Input() private recipeId: number;
    @Input() private currentUser: User;
    @Input() private comments: Comment[];
    private addCommentForm: FormGroup;
    private editCommentForm: FormGroup;
    private addCommentErrorText: string;
    private editCommentErrorText: string;

    constructor(private builder: FormBuilder,
        private commentService: CommentService) { }

    private get acf() { return this.addCommentForm.controls }

    private get ecf() { return this.editCommentForm.controls }

    ngOnInit() {
        this.editCommentForm = this.builder.group({
            content: ['', Validators.required]
        });
        this.addCommentForm = this.builder.group({
            content: ['', Validators.required]
        });
    }

    onSubmitAdd() {
        const model = {
            Content: this.addCommentForm.controls.content.value,
            RecipeId: this.recipeId
        };
        const request = this.commentService.createComment(model);
        request.subscribe({
            next: this.handleSuccessAddComment.bind(this),
            error: this.handleErrorAddComment.bind(this)
        });
    }

    private handleSuccessAddComment(res: Object) {
        const comment = res as Comment;
        comment.userId = this.currentUser.userId;
        comment.userName = this.currentUser.userName;
        this.comments.unshift(comment);
    }

    private handleErrorAddComment(errors: any) {
        this.addCommentErrorText = errors.error.errors[0];
    }
}
