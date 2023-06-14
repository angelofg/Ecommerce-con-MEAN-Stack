import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public url;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  //recibe los datos de login.component.ts
  login_admin(data:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    //envia los datos en formato Json al AdminController(backend)
    return this._http.post(this.url+'login_admin',data,{headers:headers});
  }

  getToken(){
    return localStorage.getItem('token');
  }

}
