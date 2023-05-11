import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit{
  proyectosList:any;
  constructor(private datosPortafolio:PortafolioService, public authService:AuthService){}
  ngOnInit(): void{
    this.refreshPeople();
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.proyectosList=data.proyectos;
      })      
  }

  llenarEditarProyectos(id:string){
    var contenedor = this.proyectosList.filter((data: { id: string; }) => data.id == id);
    var asignador = document.getElementById("editProId");
    asignador!.textContent = id;
  $('#editarProyectoModal').modal('show');
}


borrarProyecto(data:any){
    const url = `http://localhost:3000/proyectos/${data.id}`;
    this.datosPortafolio.eliminarPro(url, data).subscribe();
}
}
