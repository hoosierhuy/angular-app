import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
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
    // Put method works well with my persistence service
    const req = new HttpRequest('PUT', this.apiUrl, this.recipeService.getRecipes(), { reportProgress: true });

    return this.httpClient.request(req);
  }

  getRecipes$() {
    this.httpClient.get<RecipeModel[]>(this.apiUrl, {
      observe: 'body',
      responseType: 'json'
    })
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
