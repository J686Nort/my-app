import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Type } from './models/type';
import { User } from './models/user';

const TYPES: Type[] = [
  {id: 1, name: 'news'},
  {id: 2, name: 'notes'},
  {id: 3, name: 'videos'},
];

let USERS: User[] = [
  {id: 1, email: 'exa@mpl.eru', name: 'John', date: 2132142443, type: TYPES[0]},
  {id: 2, email: 'exa@mpl.com', name: 'Jack', date: 324324324, type: TYPES[1]},
  {id: 3, email: 'xxx@yyy.zzz', name: 'Bart', date: 23432432432, type: TYPES[2]}
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  users = USERS;
  types = TYPES;
  isUserExist = false;

  addUserForm : FormGroup = new FormGroup({
    
    "name": new FormControl("", [
        Validators.required, 
        Validators.pattern("[a-zA-Z]{1,60}") 
    ]),
    "email": new FormControl("", [
        Validators.required, 
        Validators.pattern("[a-z]{3}@[a-z]{3}?\.[a-z]{3}") 
    ]),
    "type": new FormControl(TYPES[0], [])
  });

  deleteUser(index:number) {
    this.users.splice(index, 1);
  };

  clear() {
    this.addUserForm.reset({type: TYPES[0]});
    this.isUserExist = false;
  }

  submit() {
    if (!this.addUserForm.invalid) {
      const newId: number = (this.users.length == 0) ? 1 : this.users[this.users.length-1].id + 1;
      
      let newUser: User = {
        id: newId,
        email: this.addUserForm.value.email,
        name: this.addUserForm.value.name,
        type:  this.addUserForm.value.type,
        date: Date.now()
      };
      
      if (this.users.map((e) => { return e.email; }).indexOf(newUser.email) == -1) {
        this.users.push(newUser);
        this.addUserForm.reset({type: TYPES[0]});
      } else {
        this.isUserExist = true;
      }
    }
  }
}
