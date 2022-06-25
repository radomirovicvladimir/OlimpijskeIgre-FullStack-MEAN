import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  uri = 'http://localhost:4000';

  register(
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string,
    country: string,
    flag: File,
    type: string
  ) {
    const data = new FormData();
    data.append('firstname', firstname);
    data.append('lastname', lastname);
    data.append('email', email);
    data.append('username', username);
    data.append('password', password);
    data.append('country', country);
    data.append('type', type);
    if (flag) {
      data.append('flag', flag, country);
    }
    return this.http.post<{message:string, user: User}>(`${this.uri}/users/register`, data);
  } // end of register

  login(username: string, password: string) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post<{message:string, user: User}>(`${this.uri}/users/login`, data);
  }

  getAllUsers() {
    return this.http.get(`${this.uri}/users/allUsers`);
  }

  getDelegates() {
    return this.http.get(`${this.uri}/users/getDelegates`);
  }

  approveUser(user: User) {
    return this.http.post(`${this.uri}/users/approve`, user);
  }

  deleteUser(user: User) {
    return this.http.post(`${this.uri}/users/delete`, user);
  }

}
