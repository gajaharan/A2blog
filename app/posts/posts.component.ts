import {Component, OnInit} from "@angular/core";
import {PostsService} from "./posts.service";
import {IPost} from "./post";
import {UsersService} from "../users/users.service";
import {IUser} from "../users/user";

@Component({
  selector: 'posts',
  moduleId: module.id,
  templateUrl: 'posts.component.html',
  styles: [`
        .posts li { cursor: default; }
        .posts li:hover { background: #ecf0f1; } 
        .list-group-item.active, 
        .list-group-item.active:hover, 
        .list-group-item.active:focus { 
            background-color: #ecf0f1;
            border-color: #ecf0f1; 
            color: #2c3e50;
        }
    `],
})

export class PostsComponent implements OnInit {
  pagetitle: string;
  posts: IPost[];
  users: IUser[];
  postsLoading = true;
  currentPost: IPost;
  commentsLoading = true;
  pagedPosts: any = [];
  pageSize = 10;

  constructor(private _postService: PostsService, private _userService: UsersService) {
    this.pagetitle = 'Posts';
  }

  ngOnInit() {
    this._postService.getPosts()
      .subscribe(posts => this.posts = posts,
        null,
        () => {
          this.postsLoading = false;
        });
    this.loadUsers();
    this.loadPosts();
  }

  private loadUsers() {
    this._userService.getUsers()
      .subscribe(users => this.users = users);
  }

  private loadPosts(filter?: string) {
    this.postsLoading = true;
    this._postService.getPosts(filter)
      .subscribe(
        posts => {
          this.posts = posts;
          this.pagedPosts = this.getPostsInPage(1);
        },
        null,
        () => {
          this.postsLoading = false;
        });
  }

  select(post: IPost) {
    this.currentPost = post;

    this.commentsLoading = true;
    this._postService.getComments(post.id)
      .subscribe(
        comments =>
          this.currentPost.comments = comments,
        null,
        () => this.commentsLoading = false);
  }

  reloadPosts(filter: string) {
    this.currentPost = null;

    this.loadPosts(filter);
  }

  onPageChanged(page: any) {
    this.pagedPosts = this.getPostsInPage(page);
  }

  private getPostsInPage(page: any) {
    var result: any = [];
    var startingIndex = (page - 1) * this.pageSize;
    var endIndex = Math.min(startingIndex + this.pageSize, this.posts.length);

    for (var i = startingIndex; i < endIndex; i++)
      result.push(this.posts[i]);

    return result;
  }

}
