import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;
  todoMutable: Todo;
  @ViewChild('inputFisico') txtInputFisico: ElementRef;
  chkCompleted: FormControl;
  txtInput: FormControl;
  editing: boolean = false;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // this.todo.completed = true;
    this.todoMutable = {...this.todo};
    this.chkCompleted = new FormControl(this.todoMutable.completed);
    this.txtInput = new FormControl(this.todoMutable.text, Validators.required);

    this.chkCompleted.valueChanges.subscribe(value => {
      this.store.dispatch(actions.toggle({id: this.todoMutable.id}));
    });
  }

  edit() {
    this.editing = true;
    this.txtInput.setValue(this.todoMutable.text);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  endEdition() {
    this.editing = false;

    if(this.txtInput.invalid) {
      return;
    }

    if(this.txtInput.value === this.todoMutable.text) {
      return;
    }

    this.store.dispatch(
      actions.edit({
        id: this.todoMutable.id,
        text: this.txtInput.value
      })
    );
  }

  delete() {
    this.store.dispatch(actions.deleter({id: this.todoMutable.id}));
  }
}
