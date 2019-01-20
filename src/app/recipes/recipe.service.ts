import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { RecipeModel } from './recipe.model';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })
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

  // Injecting the ShoppingList service into this service so I can call a method from it.
  constructor(private shoppingListService: ShoppingListService) {}

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

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged$.next(this.recipes.slice());
  }
}
