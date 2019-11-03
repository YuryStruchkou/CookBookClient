import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { RepositoryService } from './repository.service';

@Injectable({
    providedIn: 'root'
})
export class CommentService {
    private commentEndpoint = AppConfigService.settings.apiEndpoints.comment;

    constructor(private repository: RepositoryService) { }

    public createComment(body: any) {
        return this.repository.post(this.commentEndpoint, body);
    }

    public updateComment(body: any, id: number) {
        return this.repository.put(this.commentEndpoint + id, body);
    }

    public deleteComment(id: number) {
        return this.repository.delete(this.commentEndpoint + id);
    }
}
