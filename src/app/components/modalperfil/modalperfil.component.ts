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
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.perfil=data.perfil;
      })      
  }

  editarPerfil(){
    //GUARDO VALORES
    this.nombreEd = this.formEd.value.nombreEd;
    this.profesionEd = this.formEd.value.profesionEd;
    this.ciudadEd = this.formEd.value.ciudadEd;
    var id = "1";
    //CREO EL ITEM Y LO AGREGO
    var items = { "id":id, "nombre":this.nombreEd, "profesion":this.profesionEd, "ciudad":this.ciudadEd, "universidad":"Universidad De La Punta", "foto": "./assets/imagenes/fotoPerfil.jpg", "fotoUniversidad": "./assets/imagenes/logo.png" }
    const url = `http://localhost:3000/perfil/${id}`;
    this.datosPortafolio.editarPer(url, items).subscribe();
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    $('#editInfoPerfilModal').modal('hide');
    //location.reload();
  }
}
