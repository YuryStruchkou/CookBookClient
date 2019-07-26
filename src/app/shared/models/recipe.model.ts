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
    totalVotes: number;
    averageVote: number;
    userVote: number;
    userName: string;
}