import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromApp from '../../app-ngrx-store/app.reducers';
import * as fromAuth from '../../auth/auth-ngrx-store/auth.reducers';
import * as AuthActions from '../../auth/auth-ngrx-store/auth.actions';
import * as RecipeActions from '../../recipes/recipes-ngrx-store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.IState>;

  constructor(
    private store: Store<fromApp.IAppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
