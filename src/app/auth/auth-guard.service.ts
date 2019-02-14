import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

import * as fromAppReducers from '../app-ngrx-store/app.reducers';
import * as fromAuthReducers from './auth-ngrx-store/auth.reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAppReducers.IAppState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select('auth')
      .pipe(
        take(1),
        map((authState: fromAuthReducers.IState) => {
          return authState.authenticated;
        }),
      );
  }
}
