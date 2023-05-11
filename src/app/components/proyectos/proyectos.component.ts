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
    this.datosPortafolio.obtenerDatosProyectos()
      .subscribe(data => {
        this.proyectosList=data;
      })      
  }

  llenarEditarProyectos(id:string){
    var contenedor = this.proyectosList.filter((data: { idProyectos: string; }) => data.idProyectos == id);
    var nombre = contenedor[0].titulo;
    var url = contenedor[0].url;
    var pagina = contenedor[0].pagina;
    var descripcion = contenedor[0].descripcion;
    $("#editNombreProyecto").val(nombre);
    $("#editUrlProyecto").val(url);
    $("#editPaginaProyecto").val(pagina);
    $("#editDescripionProyecto").val(descripcion);
    var asignador = document.getElementById("editProId");
    asignador!.textContent = id;
  $('#editarProyectoModal').modal('show');
}


borrarProyecto(data:any){
    const url = `https://portafolio-backend-rb21.onrender.com/proyectos/eliminar/${data.idProyectos}`;
    this.datosPortafolio.eliminarPro(url, data).subscribe();
    location.reload();
}
}
