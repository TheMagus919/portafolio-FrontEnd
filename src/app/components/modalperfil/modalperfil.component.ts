import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-modalperfil',
  templateUrl: './modalperfil.component.html',
  styleUrls: ['./modalperfil.component.css']
})
export class ModalperfilComponent {
  nombreEd = '';
  profesionEd = '';
  ciudadEd = '';

  formEd: FormGroup;
  perfil:any;
  imagen:any;
  info:any;
  constructor(private http:HttpClient, private formBuilder: FormBuilder, private datosPortafolio:PortafolioService, private bannerComponent:BannerComponent){
    this.formEd = this.formBuilder.group({
      nombreEd:['',[Validators.required]],
      profesionEd:['',[Validators.required]],
      ciudadEd:['',[Validators.required]]
    })
  }

  ngOnInit(): void{
    this.refreshPeople();
  }
  get NombreEd(){
    return this.formEd.get("nombreEd");
  }
  get ProfesionEd(){
    return this.formEd.get("profesionEd");
  }
  get CiudadEd(){
    return this.formEd.get("ciudadEd");
  }
  get NombreEdValid() {
    return this.NombreEd?.touched && !this.NombreEd?.valid
  }
  get ProfesionEdValid() {
    return this.ProfesionEd?.touched && !this.ProfesionEd?.valid
  }
  get CiudadEdValid() {
    return this.CiudadEd?.touched && !this.CiudadEd?.valid
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosPerfil()
      .subscribe(data => {
        this.perfil=data;
        this.imagen = data.foto;
        this.info = data.info;
      })      
  }

  editarPerfil(){
    //GUARDO VALORES
    this.nombreEd = this.formEd.value.nombreEd;
    this.profesionEd = this.formEd.value.profesionEd;
    this.ciudadEd = this.formEd.value.ciudadEd;
    var id = "1";
    var uni = "Universidad De La Punta";
    var unifoto = "./assets/imagenes/logo.png";

    //SI LOS VALORES SIGUEN POR DEFECTO LOS ASGINO OTRA VEZ
    if(this.NombreEd?.value.length == 0){
      var nombre = $("#editNombrePerfil").val();
      this.nombreEd = <string>nombre;
    }
    if(this.ProfesionEd?.value.length == 0){
      var profesion = $("#editProfesionPerfil").val();
      this.profesionEd = <string>profesion;
    }
    if(this.CiudadEd?.value.length == 0){
      var ciudad = $("#editCiudadPerfil").val();
      this.ciudadEd = <string>ciudad;
    }

    //CREO EL ITEM Y LO AGREGO
    var items = { "idPerfil":id, "nombre":this.nombreEd, "profesion":this.profesionEd, "ciudad":this.ciudadEd, "universidad":uni, "info":this.info, "fotouniversidad": unifoto, "foto": this.imagen }
    const url = `https://portafolio-backend-rb21.onrender.com/perfil/editar`;
    this.datosPortafolio.editarPer(url, items).subscribe();
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    $('#editInfoPerfilModal').modal('hide');
    location.reload();
  }
}
