import { EventEmitter, Injectable } from '@angular/core';
import { IngredientModel } from '../shared/ingredient.model';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged = new EventEmitter<IngredientModel[]>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Bacon', 69),
    new IngredientModel('Beef Rounds', 12)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingredient: IngredientModel, publishChanges = true) {
    const index = this.ingredients.findIndex(ingrd => ingrd.name === ingredient.name);

    if (index === -1) {
      this.ingredients.push(ingredient);
    } else {
      this.ingredients[index].amount += ingredient.amount;
    }

    if (publishChanges) {
      this.ingredientsChanged.emit(this.ingredients.slice());
    }
  }

  addIngredients(ingredients: IngredientModel[]) {
    ingredients.forEach(ingredient => this.addIngredient(ingredient, false));
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
