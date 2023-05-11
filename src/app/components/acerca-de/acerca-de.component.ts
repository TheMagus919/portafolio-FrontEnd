import { Component, OnInit } from '@angular/core';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {

  informacion:any;
  constructor(private datosPortafolio:PortafolioService, private formBuilder: FormBuilder, public authService:AuthService){}
  ngOnInit(): void{
    this.refreshPeople();
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosPerfil()
      .subscribe(data => {
        this.informacion=data.info;
      })      
  }
  
  habilitarEdit(){
    var valor = document.getElementById("informacionEdit")?.hasAttribute("disabled");
    if(valor){
      document.getElementById("informacionEdit")?.removeAttribute("disabled")
      document.getElementById("informacionEdit")?.setAttribute("enabled", "enabled");
      document.getElementById("botonEdit")?.removeAttribute("hidden");
      document.getElementById("consejo")?.removeAttribute("hidden");
    }else{
      document.getElementById("informacionEdit")?.removeAttribute("enabled")
      document.getElementById("informacionEdit")?.setAttribute("disabled", "disaabled");
      document.getElementById("botonEdit")?.setAttribute("hidden", "hidden");
      document.getElementById("consejo")?.setAttribute("hidden", "hidden");
    }
  }

  guardar(){
    const area = document.getElementById(`informacionEdit`) as HTMLTextAreaElement;
    const url = `https://portafolio-backend-rb21.onrender.com/perfil/cambiarinfo/1`;
    this.datosPortafolio.editarAce(url, area.value).subscribe();
    document.getElementById("informacionEdit")?.removeAttribute("enabled")
    document.getElementById("informacionEdit")?.setAttribute("disabled", "disaabled");
    document.getElementById("botonEdit")?.setAttribute("hidden", "hidden");
    document.getElementById("consejo")?.setAttribute("hidden", "hidden");
    alert("Se Edito Correctamente.")
  }
}
