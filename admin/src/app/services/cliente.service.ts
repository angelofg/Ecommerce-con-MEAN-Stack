import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient){
    this.url = GLOBAL.url;
  }

  //recibe los datos de
  listar_clientes_filtro_admin(tipo:any,filtro:any):Observable<any>{
    let headers = new HttpHeaders().set('Content-Type','application/json');

    //obtiene datos en formato Json atraves de ClienteController(backend)
    return this._http.get(this.url+'listar_clientes_filtro_admin/'+tipo+'/'+filtro,{headers:headers});
  }

}
