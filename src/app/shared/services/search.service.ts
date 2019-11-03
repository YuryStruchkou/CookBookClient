import { Injectable } from '@angular/core';
import { RepositoryService } from './repository.service';
import { AppConfigService } from './app-config.service';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private searchEndpoint = AppConfigService.settings.apiEndpoints.search;

    constructor(private repository: RepositoryService) { }

    public searchRecipes(query: string, page: number) {
        return this.repository.get(this.searchEndpoint, { params: { query: query, page: page } });
    }
}
