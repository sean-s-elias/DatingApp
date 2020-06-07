import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(): Observable<User[]>{
  return this.http.get<User[]>(this.baseurl + 'users');
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseurl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseurl + 'users/' + id, user);
}
}
