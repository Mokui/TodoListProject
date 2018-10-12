import { ActionService } from './../services/action.service';
import { Action } from './../action';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  actions: Action[];
  action: Action;

  constructor(private actionService: ActionService) {
  }

  ngOnInit() {
    this.getActions();
  }

  getActions(): any {
    this.actionService.getActions().subscribe(act => {
      console.log(act);
      this.actions = act;
    });
  }

  getAction(id) {
    this.actionService.getAction(id).subscribe(act => {
      console.log(act);
      this.action = act;
    });
  }

  addAction (action: Action) {
    this.actionService.addAction(action).subscribe(act => {
      console.log(act);
      this.action = act;
    });
  }

  updateAction (id, action) {
    this.actionService.updateAction(id , action).subscribe(act => {
      console.log(act);
      this.action = act;
    });
  }

  deleteAction(id) {
    this.actionService.deleteAction(id).subscribe(act => {
      console.log(act);
    });
  }
}
