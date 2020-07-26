import { map } from 'rxjs/operators';
import { PaginatedResult } from './../_models/Pagination';
import { User } from 'src/app/_models/user';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../_models/Message';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseurl = environment.apiUrl;

constructor(private http: HttpClient) { }

getUsers(page?, itemsPerPage?, userParams?, likesParam?): Observable<PaginatedResult<User[]>>
{
  const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

  let params = new HttpParams();

  if (page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  if (userParams != null)
  {
    params = params.append('minAge', userParams.MinAge);
    params = params.append('maxAge', userParams.MaxAge);
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);
  }

  if (likesParam === 'likers')
  {
    params = params.append('likers', 'true');
  }

  if (likesParam === 'likees')
  {
    params = params.append('likees', 'true');
  }

  return this.http.get<User[]>(this.baseurl + 'users', {observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null)
        {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
}

getUser(id): Observable<User>{
  return this.http.get<User>(this.baseurl + 'users/' + id);
}

updateUser(id: number, user: User) {
  return this.http.put(this.baseurl + 'users/' + id, user);
}

setMainPhoto(userId: number, id: number)
{
  return this.http.post(this.baseurl + 'users/' + userId + '/photos/' + id + '/setMain', {});
}

deletePhoto(userId: number, id: number)
{
  return this.http.delete(this.baseurl + 'users/' + userId + '/photos/' + id);
}

sendLike(id: number, recipientId: number)
{
  return this.http.post(this.baseurl + 'users/' + id + '/like/' + recipientId, {});
}

getMessages(id: number, page?, itemsPerPage?, messageContainer?) {
  const paginatedResult: PaginatedResult<Message[]> = new PaginatedResult<Message[]>();

  let params = new HttpParams();

  params = params.append('MessageContainer', messageContainer);

  if (page != null && itemsPerPage != null)
  {
    params = params.append('pageNumber', page);
    params = params.append('pageSize', itemsPerPage);
  }

  return this.http
    .get<Message[]>(this.baseurl + 'users/' + id + '/messages', {
      observe: 'response', params})
    .pipe(
      map(response => {
        paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null)
        {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      })
    );
  }

  getMessageThread(id: number, recipientId: number)
  {
    return this.http.get<Message[]>(this.baseurl + 'users/' + id + '/messages/thread/' + recipientId);
  }

  sendMessage(id: number, message: Message) {
    return this.http.post(this.baseurl + 'users/' + id + '/messages', message);
  }

  deleteMessage(id: number, userId: number)
  {
    return this.http.post(this.baseurl + 'users/' + userId + '/messages/' + id, {});
  }

  markAsRead(userId: number, messageId: number) {
    return this.http.post(this.baseurl + 'users/' + userId + '/messages/' + messageId + '/read', {})
      .subscribe();
  }
}
