import {Injectable} from '@angular/core';
import {Http, Response} from "@angular/http";
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {IUser} from "./user";

@Injectable()
export class UsersService {
  private _url = "http://jsonplaceholder.typicode.com/users";

  constructor(private _http: Http) {
  }

  getUsers(): Observable<IUser[]> {
    return this._http.get(this._url)
      .map((response: Response) => <IUser[]> response.json())
      .do(data => console.log('All: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  getUser(userId: number) {
    return this._http.get(this.getUserUrl(userId))
      .map((response: Response) => <IUser> response.json())
      .do(data => console.log('User: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  addUser(user: IUser) {
    return this._http.post(this._url, JSON.stringify(user))
      .map((response: Response) => <IUser> response.json())
      .do(data => console.log('add: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  updateUser(user: IUser) {
    return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
      .map((response: Response) => <IUser> response.json())
      .do(data => console.log('update: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  deleteUser(userId: number) {
    return this._http.delete(this.getUserUrl(userId))
      .map((response: Response) => <IUser> response.json())
      .do(data => console.log('delete: ' + JSON.stringify(data)))
      .catch(this.handleError);
  }

  private getUserUrl(userId: number) {
    return this._url + "/" + userId;
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
