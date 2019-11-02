import { RecipeDetailResolver } from './recipe-detail.resolver';
import { TestBed } from '@angular/core/testing';

describe('RecipeDetailResolver', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
      const resolver: RecipeDetailResolver = TestBed.get(RecipeDetailResolver);
      expect(resolver).toBeTruthy();
    });
});
