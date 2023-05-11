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
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.miPerfil=data.perfil;
        this.foto= data.fotoperfil;
      })      
  }

  llenarEditarEducacion(){
  $('#editInfoPerfilModal').modal('show');
}
}
