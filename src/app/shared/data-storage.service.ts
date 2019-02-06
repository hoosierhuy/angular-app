import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { secrets } from '../../secrets';

import { RecipeService } from '../recipes/recipe.service';
import { RecipeModel } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  apiUrl = secrets.apiEndpoint;

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes$() {
    const token = this.authService.getToken();
    // Put method works well with my persistence service
    return this.httpClient.put(`${this.apiUrl}?auth=${token}`, this.recipeService.getRecipes() /* if bearer token is required, {
      observe: 'body',
      headers: new HttpHeaders().set('Authorization', 'Bearer token123abcyadayada')
    }*/);
  }

  getRecipes$() {
    const token = this.authService.getToken();

    this.httpClient.get<RecipeModel[]>(`${this.apiUrl}?auth=${token}`)
      .pipe(
        map(
          (recipes) => {
            return recipes.map(recipe => {
              if (!recipe['ingredients']) {
                recipe.ingredients = [];
              }

              return recipe;
            });
          }
        )
      )
      .subscribe(
        (recipes: RecipeModel[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
