import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

import * as fromApp from '../../app-ngrx-store/app.reducers';
import * as AuthActions from '../auth-ngrx-store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private store: Store<fromApp.IAppState>,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSignin(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    this.store.dispatch(new AuthActions.TrySingin({username: email, password: password}));
    this.router.navigate(['/']);
  }

}
