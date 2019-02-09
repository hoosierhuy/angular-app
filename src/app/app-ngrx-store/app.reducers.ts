import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/shopping-list-ngrx-store/shopping-list.reducers';
import * as fromAuth from '../auth/auth-ngrx-store/auth.reducers';

export interface IAppState {
  shoppingList: fromShoppingList.IState;
  auth: fromAuth.IState;
}

export const appReducers: ActionReducerMap<IAppState> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
