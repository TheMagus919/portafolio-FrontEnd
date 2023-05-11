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
    this.datosPortafolio.obtenerDatos().subscribe(data => {
      this.habilidadesList = data.habilidades;
    });
  }

  llenarEditarHab(id:string){
    var contenedor = this.habilidadesList.filter((data: { id: string; }) => data.id == id);
    console.log(contenedor)
    var nombre = contenedor[0].nombre;
    var asd = document.getElementById("editId");
    console.log(asd)
    asd!.textContent = id;
    $('#editarHabilidadModal').modal('show');
  }

  borrarHab(data:any):void{
    console.log(data)
    const url = `http://localhost:3000/habilidades/${data.id}`;
    this.datosPortafolio.eliminarHab(url, data).subscribe();
  }
}

