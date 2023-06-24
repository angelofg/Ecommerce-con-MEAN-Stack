import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { AdminService } from "../services/admin.service";


@Injectable({
  providedIn: 'root'
})

export class AdminGuard {

  constructor(private _adminService:AdminService, private _router:Router){}


  canActivate():any{
  //si no tiene rol admin redirecciona al login
  if(!this._adminService.isAuthenticated(['admin'])){
    this._router.navigate(['/login']);
    return false;
  }
  return true;

  }

}

