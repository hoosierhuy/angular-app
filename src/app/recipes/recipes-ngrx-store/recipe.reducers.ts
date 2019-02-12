import { RecipeModel } from '../recipe.model';
import { IngredientModel } from '../../shared/ingredient.model';
import * as RecipeActions from './recipes.actions';
import * as fromAppReducers from '../../app-ngrx-store/app.reducers';

export interface IFeatureState extends fromAppReducers.IAppState {
  recipes: IState;
}

export interface IState {
  recipes: RecipeModel[];
}

const initialState: IState = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.SET_RECIPES:
      return {
        ...state,
        recipes: [...action.payload]
      };
    case RecipeActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
    case RecipeActions.UPDATE_RECIPE:
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const _recipes = [...state.recipes];
      _recipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipe: _recipes
      };
    case RecipeActions.DELETE_RECIPE:
      const oldRecipes = [...state.recipes];
      oldRecipes.splice(action.payload, 1);

      return {
        ...state,
        recipes: oldRecipes
      };
    default:
      return state;
  }
}
