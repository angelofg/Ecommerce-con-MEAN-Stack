import { Component, OnInit } from '@angular/core';
import { GuestService } from 'src/app/services/guest.service';
declare var $:any;

@Component({
  selector: 'app-direcciones',
  templateUrl: './direcciones.component.html',
  styleUrls: ['./direcciones.component.css']
})
export class DireccionesComponent implements OnInit {

  public token : any;
  public direccion : any = {
    pais: '',
    region: '',
    provincia: '',
    distrito: '',
    principal: false
  };

  public regiones : Array<any> = [];
  public provincias : Array<any> = [];
  public distritos : Array<any> = [];

  constructor(
    private _guestService: GuestService
  ){
    this.token = localStorage.getItem('token');

  }

  ngOnInit(): void {
  }

  select_pais(){
    if(this.direccion.pais == "Perú"){
      $('#sl-region').prop('disabled', false);
      this._guestService.get_Regiones().subscribe(
        response=>{
          //console.log(response);
          response.forEach((element:any) => {
            this.regiones.push({
              id: element.id,
              name: element.name
            });
          });

        }
      );
    }else{
      $('#sl-region').prop('disabled', true);
      $('#sl-provincia').prop('disabled', true);
      $('#sl-distrito').prop('disabled', true);
      this.regiones = [];
      this.provincias = [];
      this.distritos = [];

      this.direccion.region = '';
      this.direccion.provincia = '';
      this.direccion.distrito = '';
    }
  }

  select_region(){
    this.provincias = [];
    $('#sl-provincia').prop('disabled', false);
    $('#sl-distrito').prop('disabled', true);
    this.direccion.provincia = '';
    this.direccion.distrito = '';
    this._guestService.get_Provincias().subscribe(
      response=>{
        //console.log(response);
        response.forEach((element:any) => {
          if(element.department_id == this.direccion.region){
            this.provincias.push(
              element
            );
          }
        });
        //console.log(this.provincias);
      }
    );
  }

  select_provincia(){
    this.distritos = [];
    $('#sl-distrito').prop('disabled', false);
    this.direccion.distrito = '';
    this._guestService.get_Distritos().subscribe(
      response=>{
        response.forEach((element:any) => {
          if(element.province_id == this.direccion.provincia){
            this.distritos.push(
              element
            );
          }
        });
        console.log(this.distritos);
      }
    );
  }

}
