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
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.experienciaList=data.experiencias;
      })      
  }

  llenarEditarExperiencia(id:string){
    var contenedor = this.experienciaList.filter((data: { id: string; }) => data.id == id);
    var asignador = document.getElementById("editExpId");
    asignador!.textContent = id;
    //document.querySelector("input#editInstitucionEducacion")?.setAttribute("value", institucion);
    //document.querySelector("input#editCarreraEducacion")?.setAttribute("value", carrera);
  $('#editarExperienciaModal').modal('show');
}


borrarExperiencia(data:any){
    const url = `http://localhost:3000/experiencias/${data.id}`;
    this.datosPortafolio.eliminarExp(url, data).subscribe();
}
}
