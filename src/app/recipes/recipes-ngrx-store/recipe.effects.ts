import { Effect, Actions, ofType } from '@ngrx/effects';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as RecipeActions from '../recipes-ngrx-store/recipe.actions';
import { RecipeModel } from '../recipe.model';
import { secrets } from '../../../secrets';
import * as fromRecipeReducers from '../recipes-ngrx-store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  apiUrl = secrets.apiEndpoint;

  @Effect()
  recipeFetch = this.actions$
    .pipe(
      ofType(RecipeActions.FETCH_RECIPES),
      switchMap((action: RecipeActions.FetchRecipes) => {
      return this.httpClient.get<RecipeModel[]>(this.apiUrl, {
        observe: 'body',
        responseType: 'json'
      });
    }), map(
      (recipes) => {
        console.log(recipes);
        for (const recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return {
          type: RecipeActions.SET_RECIPES,
          payload: recipes
        };
      }
    ));

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .pipe(
      ofType(RecipeActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([action, state]) => {
        const req = new HttpRequest('PUT', this.apiUrl, state.recipes, {reportProgress: true});
        return this.httpClient.request(req);
      }));

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipeReducers.IFeatureState>) {
  }
}
