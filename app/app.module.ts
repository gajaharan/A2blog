import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent}  from './app.component';
import {NavbarComponent} from "./nav-bar/navbar.component";
import {AppRoutingModule, routableComponents} from "./app-routing.module";
import {PostsModule} from "./posts/posts.module";
import {UsersModule} from "./users/users.module";
import {HttpModule} from "@angular/http";

@NgModule({
  imports: [BrowserModule, HttpModule, PostsModule, UsersModule, AppRoutingModule],
  declarations: [AppComponent, NavbarComponent, routableComponents],
  bootstrap: [AppComponent]
})
export class AppModule {
}
