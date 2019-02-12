import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ActivatedRoute, Router } from '@angular/router';
import * as fromRecipeReducers from '../recipes-ngrx-store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<fromRecipeReducers.IState>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromRecipeReducers.IFeatureState>
  ) { }

  ngOnInit() {
    // Feature state in recipes.module.ts file
    this.recipeState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
