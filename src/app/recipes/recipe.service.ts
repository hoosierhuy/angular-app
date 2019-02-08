import { Subject } from 'rxjs';

import { RecipeModel } from './recipe.model';
import { IngredientModel } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/ngrx-store/shopping-list.actions';

export class RecipeService {
  recipesChanged$ = new Subject<RecipeModel[]>();

  private recipes: RecipeModel[] = [
    new RecipeModel('Carne Asada', 'Marinated flank steak',
      'https://wonkywonderful.com/wp-content/uploads/2017/06/carne-asada-recipe-4.jpg',
      [
        new IngredientModel('flank steak', 1),
        new IngredientModel('lard', 1),
        new IngredientModel('lime juice', 4)
      ]),
    new RecipeModel('Bone Broth', 'Beef bone broth',
      'https://thehealthyfoodie.com/wp-content/uploads/2016/10/Slow-Cooker-Bone-Broth.jpg',
      [
        new IngredientModel('beef bones', 1),
        new IngredientModel('onion', 1)
      ])
  ];

  constructor() {}

  setRecipes(recipes: RecipeModel[]) {
    this.recipes = recipes;
    this.recipesChanged$.next(this.recipes.slice());
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: RecipeModel) {
    this.recipes.push(recipe);
    this.recipesChanged$.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: RecipeModel) {
    this.recipes[index] = newRecipe;
    this.recipesChanged$.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged$.next(this.recipes.slice());
  }
}
