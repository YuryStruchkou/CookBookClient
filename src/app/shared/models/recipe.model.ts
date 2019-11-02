import { VoteData } from './vote-data.model';

export class Recipe {
    id: number;
    name: string;
    description: string;
    content: string;
    tags: string[];
    creationDate: Date;
    editDate: Date;
    deleteDate: Date;
    recipeStatus: string;
    recipeVoteData: VoteData;
    userName: string;
}

