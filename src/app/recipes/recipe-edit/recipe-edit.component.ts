import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe( // This observable is managed by Angular, that's why I didn't explicitly call destroy on it.
        (params: Params) => {
          this.id = params['id'];
          this.editMode = (params['id'] !== undefined) || (params['id'] !== null);
        }
      );
  }

}
