import 'rxjs/add/operator/map';
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {IPost} from "./post";

@Injectable()
export class PostsService {
  private _url = "http://jsonplaceholder.typicode.com/posts";

  constructor(private _http: Http) {
  }

  getPosts(filter?: string): Observable<IPost[]> {

    var filterUrl = this._url;

    if (filter) {
      filterUrl  += "?userId=" + filter;
    }


    return this._http.get(filterUrl)
      .map((response: Response) => <IPost[]> response.json())
      //.do(data => console.log('All: ' +  JSON.stringify(data)))
      .catch(this.handleError);


  }

  getComments(postId: number) {
    return this._http.get(this._url + "/" + postId + "/comments")
      .map(res => res.json());
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
