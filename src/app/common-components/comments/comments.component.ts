import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/shared/models/user.model';
import { Comment } from 'src/app/shared/models/comment.model';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
    @Input() private currentUser: User;
    @Input() private comments: Comment[];

    constructor() { }

    ngOnInit() {
    }

}
