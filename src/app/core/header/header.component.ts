import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../app-ngrx-store/app.reducers';
import * as fromAuth from '../../auth/auth-ngrx-store/auth.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<fromAuth.IState>;

  constructor(
    private dataStorageService: DataStorageService,
    public authService: AuthService,
    private store: Store<fromApp.IAppState>
  ) {}

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorageService.storeRecipes$()
      .subscribe(
        response => console.log(response),
        error => console.log(error)
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes$();
  }

  onLogout() {
    this.authService.logOut();
  }
}
