import {Component, OnInit}                     from '@angular/core';
import {FormBuilder, FormGroup, Validators}    from '@angular/forms';
import {Router, ActivatedRoute}                from '@angular/router';

import {BasicValidators}                       from '../shared/basicValidators';
import {UsersService}                           from './users.service';
import {IUser}                                  from './user';

@Component({
  moduleId: module.id,
  templateUrl: 'users-form.component.html'
})
export class UserFormComponent implements OnInit {
  form: FormGroup;
  title: string;
  user = new IUser();

  constructor(fb: FormBuilder,
              private _router: Router,
              private _route: ActivatedRoute,
              private _usersService: UsersService) {
    this.form = fb.group({
      name: ['', Validators.required],
      email: ['', BasicValidators.email],
      phone: [],
      address: fb.group({
        street: [],
        suite: [],
        city: [],
        zipcode: []
      })
    });
  }

  ngOnInit() {
    var id = this._route.params.subscribe(params => {
      var id = +params["id"];

      this.title = id ? "Edit User" : "New User";

      if (!id)
        return;

      this._usersService.getUser(id)
        .subscribe(
          user => this.user = user,
          response => {
            if (response.status == 404) {
              this._router.navigate(['NotFound']);
            }
          });
    });
  }

  save() {
    var result: any;

    if (this.user.id)
      result = this._usersService.updateUser(this.user);
    else
      result = this._usersService.addUser(this.user)

    result.subscribe((x: any) => {
      // Ideally, here we'd want:
      this.form.markAsPristine();
      this._router.navigate(['users']);
    });
  }
}
