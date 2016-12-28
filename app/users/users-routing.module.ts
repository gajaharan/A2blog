import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {UsersComponent} from "./users.component";
import {UserFormComponent} from "./users-form.component";
import {PreventUnsavedChangesGuard} from "../prevent-unsaved-changes-guard.service";

const routes: Routes = [
  {path: 'users', component: UsersComponent},
  {path: 'users/:id', component: UserFormComponent, canDeactivate: [PreventUnsavedChangesGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class UsersRoutingModule {

}

export const routableComponents = [
  UsersComponent
]
