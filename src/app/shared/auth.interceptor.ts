import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, switchMap } from 'rxjs/operators';

import * as fromAppReducers from '../app-ngrx-store/app.reducers';
import * as fromAuthReducers from '../auth/auth-ngrx-store/auth.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private store: Store<fromAppReducers.IAppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Intercepted!', req);

    return this.store.select('auth')
      .pipe(take(1),
        switchMap((authState: fromAuthReducers.IState) => {
          const copiedReq = req.clone({params: req.params.set('auth', authState.token)});
          return next.handle(copiedReq);
        }));
  }
}
