import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { query } from '@angular/animations';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit{
  educacionList:any;
  constructor(private http:HttpClient, private datosPortafolio:PortafolioService, public authService:AuthService){}

  ngOnInit(): void{
    this.refreshPeople();
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosEducacion()
      .subscribe(data => {
        this.educacionList=data;
      })      
  }

  llenarEditarEducacion(id:string){
    var contenedor = this.educacionList.filter((data: { idEducacion: string; }) => data.idEducacion == id);
    var institucion = contenedor[0].universidad;
    var carrera = contenedor[0].carrera;
    var fecha = contenedor[0].fecha;
    $("#editInstitucionEducacion").val(institucion);
    $("#editCarreraEducacion").val(carrera);
    $("#editFechaEducacion").val(fecha);
    var asignador = document.getElementById("editEduId");
    asignador!.textContent = id;
  $('#editarEducacionModal').modal('show');
}


borrarEducacion(data:any){
  console.log(data);
    const url = `https://portafolio-backend-rb21.onrender.com/educacion/eliminar/${data.idEducacion}`;
    this.datosPortafolio.eliminarEdu(url, data).subscribe();
    location.reload();
}
}



