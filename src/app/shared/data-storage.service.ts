import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { secrets } from '../../secrets';

import { RecipeService } from '../recipes/recipe.service';
import { RecipeModel } from '../recipes/recipe.model';

@Injectable()
export class DataStorageService {
  apiUrl = secrets.apiEndpoint;

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService
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
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return recipes;
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
