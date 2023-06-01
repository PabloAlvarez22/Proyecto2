import { Injectable } from '@angular/core';
import { CONNECTION } from '../global';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestUserService {

  public uri: string;
  public token;
  public user;
  public status;
  public httpOptions = {
    headers : new HttpHeaders({
      'Content-Type' : 'application/json'
    })
  }

  public httpOptionsAuth = {
    headers : new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    })
  }
  
  private extractData(res:Response){
    let body = res;
    return body || [] || {};
  }

  public getToken(){
    let token = localStorage.getItem("token");
    
    if(token != null || token != undefined){
      let tokenR = token.replace(/['"]+/g,'');
      this.token = "bearer "+tokenR;
    }else{
      this.token = null;
    }

    return this.token;
  }

  public getUser(){
    let user = JSON.parse(localStorage.getItem("user"));
    if(user != null || user != undefined){
      this.user = user;
    }else{
      this.user = null;
    }

    return this.user;
  }
  constructor(private http:HttpClient) { 
    this.uri = CONNECTION.URI;
  }



  login(user){

   
    let params = JSON.stringify(user);
    return this.http.post(this.uri+"auth/login",params,this.httpOptions)
    .pipe(map(this.extractData));
  }


  register(user){

    let params = JSON.stringify(user);
    return this.http.post(this.uri+"auth/register",params,this.httpOptions)
    .pipe(map(this.extractData));
  }


  updateUser(user){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });
    let params = JSON.stringify(user);
    return this.http.post(this.uri+"auth/updateUser",params,{headers:headers})
    .pipe(map(this.extractData));
  }


}
