import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit{
  habilidadesList:any;
  constructor(private datosPortafolio:PortafolioService, public authService:AuthService){}
  ngOnInit(): void{
    this.datosPortafolio.obtenerDatosHabilidades().subscribe(data => {
      this.habilidadesList = data;
    });
  }

  llenarEditarHab(id:string){
    var contenedor = this.habilidadesList.filter((data: { idHabilidades: string; }) => data.idHabilidades == id);
    var nombre = contenedor[0].nombre;   
    $("#editNombreHab").val(nombre);
    var asd = document.getElementById("editId");
    asd!.textContent = id;
    $('#editarHabilidadModal').modal('show');
  }

  borrarHab(data:any):void{
    console.log(data)
    const url = `https://portafolio-backend-rb21.onrender.com/habilidades/eliminar/${data.idHabilidades}`;
    this.datosPortafolio.eliminarHab(url, data).subscribe();
    location.reload();
  }
}

