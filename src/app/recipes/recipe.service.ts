import { Injectable, EventEmitter } from '@angular/core';

import { RecipeModel } from './recipe.model';
import { IngredientModel } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  recipeSelected = new EventEmitter<RecipeModel>();

  private recipes: RecipeModel[] = [
    new RecipeModel('Sirloin Steak', 'Cheap lean steak',
      'http://damakpidekebap.com/media/cache/2c/17/2c17e87e34dbdc1766161f45611464f5.jpg',
      [
        new IngredientModel('sirloin steak', 1),
        new IngredientModel('olive oil', 1)
      ]),
    new RecipeModel('Vietnamese eggroll', 'Vietnamese eggroll recipe',
      'https://static1.squarespace.com/static/52d3fafee4b03c7eaedee15f/t/53de9f39e4b0467b3086c913/1407098690717/Vietnamese+egg+rolls?format=750w',
      [
        new IngredientModel('pork', 1),
        new IngredientModel('cabbage', 1)
      ])
  ];

  // Injecting the ShoppingList service into this service so I can call a method from it.
  constructor(private shoppingListService: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: IngredientModel[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
