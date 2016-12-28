import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {PostsRoutingModule, routableComponents} from "./posts-routing.module";
import {PostsComponent} from "./posts.component";
import {PostsService} from "./posts.service";
import {SpinnerComponent} from "../shared/spinner.component";
import {UsersService} from "../users/users.service";
import {PaginationComponent} from "../shared/pagination.component";

@NgModule({
  imports: [BrowserModule, PostsRoutingModule],
  declarations: [PostsComponent, routableComponents, SpinnerComponent, PaginationComponent],
  providers: [PostsService, UsersService]
})
export class PostsModule {
}
