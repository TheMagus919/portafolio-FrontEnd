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
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.educacionList=data.educacion;
      })      
  }

  llenarEditarEducacion(id:string){
    var contenedor = this.educacionList.filter((data: { id: string; }) => data.id == id);
    var institucion = contenedor[0].universidad;
    var carrera = contenedor[0].carrera;
    var asignador = document.getElementById("editEduId");
    asignador!.textContent = id;
    document.querySelector("input#editInstitucionEducacion")?.setAttribute("value", institucion);
    document.querySelector("input#editCarreraEducacion")?.setAttribute("value", carrera);
  $('#editarEducacionModal').modal('show');
}


borrarEducacion(data:any){
    const url = `http://localhost:3000/educacion/${data.id}`;
    this.datosPortafolio.eliminarEdu(url, data).subscribe();
}
}



