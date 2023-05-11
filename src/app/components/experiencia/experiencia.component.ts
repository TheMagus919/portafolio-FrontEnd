import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit{
  experienciaList:any;
  constructor(private datosPortafolio:PortafolioService, public authService:AuthService){}
  ngOnInit(): void{
    this.refreshPeople();
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosExperiencias()
      .subscribe(data => {
        this.experienciaList=data;
      })      
  }

  llenarEditarExperiencia(id:string){
    var contenedor = this.experienciaList.filter((data: { idExperiencias: string; }) => data.idExperiencias == id);
    var asignador = document.getElementById("editExpId");
    var ocupa = contenedor[0].puesto;
    var local = contenedor[0].local;
    var ciudad = contenedor[0].ciudad;
    var fecha = contenedor[0].fecha;
    asignador!.textContent = id;
    $("#editOcupacionExperiencia").val(ocupa);
    $("#editLocalExperiencia").val(local);
    $("#editCiudadExperiencia").val(ciudad);
    $("#editFechaExperiencia").val(fecha);
    $('#editarExperienciaModal').modal('show');
}


borrarExperiencia(data:any){
    const url = `https://portafolio-backend-rb21.onrender.com/experiencias/eliminar/${data.idExperiencias}`;
    this.datosPortafolio.eliminarExp(url, data).subscribe();
    location.reload();
}
}
