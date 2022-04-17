import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endPoint } from '../shared/baseURL';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private HttpClient:HttpClient
  ) {
    this.userSubject$.subscribe((res)=>{
      if(res == "") {
        this.user = localStorage.getItem('_token');
      }else{
        this.user = res;
      }
    })
  }

  public userSubject$ = new BehaviorSubject<String>("");
  public user!: any;

  public login(userForm: any){
    return this.HttpClient.post(endPoint + '/admin/user/login', userForm);
  }

  public register(userForm: any){
    return this.HttpClient.post(endPoint + '/admin/user/register', userForm);
  }
  
  public getProfile(token: any){
    if(!token) return;
    var header = {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`),
      
    }
    return this.HttpClient.get(endPoint + '/admin/user/getProfile', header);
  }
}
