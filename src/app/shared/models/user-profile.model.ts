import { RecipeNotes } from './recipe-notes.model';

export class UserProfile {
    userId: number;
    userName: string;
    imagePublicId: string;
    userStatus: string;
    isMuted: boolean;
    recipes: RecipeNotes[];
}