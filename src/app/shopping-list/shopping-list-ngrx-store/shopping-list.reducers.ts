import * as ShoppingListActions from './shopping-list.actions';

import { IngredientModel } from '../../shared/ingredient.model';

export interface IAppState {
  shoppingList: IState;
}

export interface IState {
  ingredients: IngredientModel[];
  editedIngredient: IngredientModel;
  editedIngredientIndex: number;
}

const initialState: IState = {
  ingredients: [
    new IngredientModel('Bacon', 69),
    new IngredientModel('Beef Rounds', 12)
  ],
  editedIngredient: null,
  editedIngredientIndex: -1
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const _ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ..._ingredient,
        ...action.payload.ingredient
      };
      const _ingredients = [...state.ingredients];
      _ingredients[state.editedIngredientIndex] = updatedIngredient;
      return {
        ...state,
        ingredients: _ingredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      const oldIngredients = [...state.ingredients];
      oldIngredients.splice(state.editedIngredientIndex, 1);
      return {
        ...state,
        ingredients: oldIngredients,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    case ShoppingListActions.START_EDIT:
      const _editedIngredient = {...state.ingredients[action.payload]};
      return {
        ...state,
        editedIngredient: _editedIngredient,
        editedIngredientIndex: action.payload
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
