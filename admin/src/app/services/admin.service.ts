import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";


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

  //validando el token
  public isAuthenticated(allowRoles: string[]):boolean{

    const token = localStorage.getItem('token');

    //si no hay token devuelve falso
    if(!token){
      return false;
    }

    try{
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);

      if(!decodedToken){
        console.log('No Es Valido');
        localStorage.removeItem('token');
        return false;
      }

    }catch (error){
      localStorage.removeItem('token');
        return false;
    }

    return allowRoles.includes(decodedToken['role']);
  }

}
