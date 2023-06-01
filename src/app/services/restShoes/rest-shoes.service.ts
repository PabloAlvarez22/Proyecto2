import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONNECTION } from '../global';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestShoesService {

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


  getShoesByUser(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    let params = JSON.stringify(this.getUser());
    return this.http.post(this.uri+"shoes/getShoeByUser",params,{headers:headers})
    .pipe(map(this.extractData));
  }


  getShoeByBrand(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    let params = JSON.stringify(this.getUser());
    return this.http.post(this.uri+"shoes/getShoeByBrand",params,{headers:headers})
    .pipe(map(this.extractData));
  }


  getShoeByStyle(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    let params = JSON.stringify(this.getUser());
    return this.http.post(this.uri+"shoes/getShoeByStyle",params,{headers:headers})
    .pipe(map(this.extractData));
  }



  setRelation(value){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    let params = JSON.stringify(value);
    return this.http.post(this.uri+"shoes/setRelationShoeToUser",params,{headers:headers})
    .pipe(map(this.extractData));
  }

  getFavorites(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    let params = JSON.stringify(this.getUser());
    return this.http.post(this.uri+"shoes/getFavorites",params,{headers:headers})
    .pipe(map(this.extractData));
  }



  getByMaterialSoleShoes(){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.getToken()
    });

    let params = JSON.stringify(this.getUser());
    return this.http.post(this.uri+"shoes/getByMaterialSoleShoes",params,{headers:headers})
    .pipe(map(this.extractData));
  }
}
