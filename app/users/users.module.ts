import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {UsersRoutingModule, routableComponents} from "./users-routing.module";
import {UsersComponent} from "./users.component";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserFormComponent} from "./users-form.component";
import {UsersService} from "./users.service";
import {PreventUnsavedChangesGuard} from "../prevent-unsaved-changes-guard.service";

@NgModule({
  imports: [BrowserModule, UsersRoutingModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [UsersComponent, routableComponents, UserFormComponent],
  providers: [UsersService, PreventUnsavedChangesGuard],
})
export class UsersModule {
}
