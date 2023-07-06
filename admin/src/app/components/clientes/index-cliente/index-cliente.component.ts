import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

declare var iziToast:any;
declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent implements OnInit {

  public clientes : Array<any>=[];
  public filtro_apellidos = '';
  public filtro_correo = '';

  public page = 1;
  public pageSize = 20;
  public token;
  public load_data = true;

  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService
    ) {
      this.token = this._adminService.getToken();

    }

  ngOnInit(): void{
    this.init_Data();
  }

  init_Data(){
    this._clienteService.listar_clientes_filtro_admin(null,null,this.token).subscribe(
      response=>{
        //cargar lista de clientes
        this.clientes = response.data;

        //setTimeout(()=>{
          this.load_data = false;
        //}, 3000)


      },
      error=>{
        console.log(error);

      }
    );
  }

  filtro(tipo:any){
    //filtra lista de clientes por apellidos
    if(tipo == 'apellidos'){
      this.load_data = true;
      if(this.filtro_apellidos){
        this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_apellidos,this.token).subscribe(
          response=>{
            this.clientes = response.data;
            //setTimeout(()=>{
            this.load_data = false;
            //}, 3000)
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        this.init_Data();
      }
    //filtra lista de clientes por correo
    }else if(tipo == 'correo'){
     if(this.filtro_correo){
      this.load_data = true;
      this._clienteService.listar_clientes_filtro_admin(tipo,this.filtro_correo,this.token).subscribe(
        response=>{
          this.clientes = response.data;
          //setTimeout(()=>{
          this.load_data = false;
          //}, 3000)
        },
        error=>{
          console.log(error);
        }
      );
     }else{
      this.init_Data();
     }
    }


  }

  eliminar(id:any){
    this._clienteService.eliminar_cliente_admin(id,this.token).subscribe(
      response=>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se elimino correctamente el cliente.'
        });

        $('delete-'+id).modal('hide');
        $('.modal-backdrop').removeClass('show');

        this.init_Data();

      },
      error=>{
        console.log(error);

      }
    )

  }

}
