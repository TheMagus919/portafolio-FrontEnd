import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit{
  miPerfil:any;
  foto:any;
  constructor(private datosPortafolio:PortafolioService, public authService: AuthService){}
  ngOnInit(): void{
    this.refreshPeople();
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosPerfil()
      .subscribe(data => {
        this.miPerfil=data;
        this.foto= data.foto;
      })      
  }

  llenarEditarPerfil(){
    $("#editNombrePerfil").val(this.miPerfil.nombre);
    $("#editProfesionPerfil").val(this.miPerfil.profesion);
    $("#editCiudadPerfil").val(this.miPerfil.ciudad);
  $('#editInfoPerfilModal').modal('show');
}
}
