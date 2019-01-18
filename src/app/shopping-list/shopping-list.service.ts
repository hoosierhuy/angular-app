import { Injectable } from '@angular/core';
import { IngredientModel } from '../shared/ingredient.model';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({ providedIn: 'root' })
export class ShoppingListService {
  ingredientsChanged$ = new Subject<IngredientModel[]>();
  startedEditing$ = new Subject<number>();

  private ingredients: IngredientModel[] = [
    new IngredientModel('Bacon', 69),
    new IngredientModel('Beef Rounds', 12)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: IngredientModel, publishChanges = true) {
    const index = this.ingredients.findIndex(ingrd => ingrd.name === ingredient.name);

    if (index === -1) {
      this.ingredients.push(ingredient);
    } else {
      this.ingredients[index].amount += ingredient.amount;
    }

    if (publishChanges) {
      this.ingredientsChanged$.next(this.ingredients.slice());
    }
  }

  addIngredients(ingredients: IngredientModel[]) {
    ingredients.forEach(ingredient => this.addIngredient(ingredient, false));
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: IngredientModel) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged$.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged$.next(this.ingredients.slice());
  }
}
