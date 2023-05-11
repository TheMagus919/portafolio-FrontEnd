import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { ProyectosComponent } from '../proyectos/proyectos.component';

@Component({
  selector: 'app-modal-proyectos',
  templateUrl: './modal-proyectos.component.html',
  styleUrls: ['./modal-proyectos.component.css']
})
export class ModalProyectosComponent {
  nombreAg = '';
  urlAg = '';
  descripcionAg = '';
  paginaAg = '';

  nombreEd = '';
  urlEd = '';
  descripcionEd = '';
  paginaEd = '';

  formAg: FormGroup;
  formEd: FormGroup;
  proyectosList:any;

  constructor(private http:HttpClient, private formBuilder: FormBuilder, private datosPortafolio:PortafolioService, private proyectosComponent:ProyectosComponent){
    this.formAg = this.formBuilder.group({
      nombreAg:['',[Validators.required]],
      urlAg:['',[Validators.required]],
      descripcionAg:['',[Validators.required]],
      paginaAg:['',[Validators.required]]
    })
    this.formEd = this.formBuilder.group({
      nombreEd:['',[Validators.required]],
      urlEd:['',[Validators.required]],
      descripcionEd:['',[Validators.required]],
      paginaEd:['',[Validators.required]]
    })
  }

  ngOnInit(): void{
    this.refreshPeople();
  }

  get NombreAg(){
    return this.formAg.get("nombreAg");
  }
  get UrlAg(){
    return this.formAg.get("urlAg");
  }
  get DescripcionAg(){
    return this.formAg.get("descripcionAg");
  }

  get NombreEd(){
    return this.formEd.get("nombreEd");
  }
  get UrlEd(){
    return this.formEd.get("urlEd");
  }
  get DescripcionEd(){
    return this.formEd.get("descripcionEd");
  }
  get PaginaEd(){
    return this.formEd.get("paginaEd");
  }
  get NombreAgValid() {
    return this.NombreAg?.touched && !this.NombreAg?.valid
  }
  get UrlAgValid() {
    return this.UrlAg?.touched && !this.UrlAg?.valid
  }
  get DescripcionAgValid() {
    return this.DescripcionAg?.touched && !this.DescripcionAg?.valid
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosProyectos()
      .subscribe(data => {
        this.proyectosList=data;
      })      
  }

  agregarProyecto(){
    //GUARDO VALORES
    this.nombreAg = this.formAg.value.nombreAg;
    this.urlAg = this.formAg.value.urlAg;
    this.descripcionAg = this.formAg.value.descripcionAg;
    this.paginaAg = this.formAg.value.paginaAg;
    
    if(this.paginaAg == "" || this.paginaAg == null){
      this.paginaAg= "";
    }

    //SI ES VALIDO CREO EL ITEM Y LO AGREGO
    if(this.NombreAg?.value.length > 0 && this.UrlAg?.value.length > 0 && this.DescripcionAg?.value.length > 0 && !this.NombreAgValid && !this.DescripcionAgValid && !this.UrlAgValid){
    var items = { "titulo":this.nombreAg, "descripcion":this.descripcionAg, "url":this.urlAg, "pagina":this.paginaAg }
    this.datosPortafolio.agregarPro(items).subscribe();
    this.proyectosComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#proyectosModal').modal('hide');
    location.reload();
    }else {
      alert("Porfavor ingresar datos.");
    }
  }

  editarProyecto(){
    //GUARDO VALORES
    var id = document.getElementById("editProId")?.textContent;
    this.nombreEd = this.formEd.value.nombreEd;
    this.urlEd = this.formEd.value.urlEd;
    this.descripcionEd = this.formEd.value.descripcionEd;
    this.paginaEd = this.formEd.value.paginaEd;

    //SI LOS VALORES SIGUEN POR DEFECTO LOS ASGINO OTRA VEZ
    if(this.NombreEd?.value.length == 0){
      var nombre = $("#editNombreProyecto").val();
      this.nombreEd = <string>nombre;
    }
    if(this.UrlEd?.value.length == 0){
      var url = $("#editUrlProyecto").val();
      this.urlEd = <string>url;
    }
    if(this.DescripcionEd?.value.length == 0){
      var descripcion = $("#editDescripionProyecto").val();
      this.descripcionEd = <string>descripcion;
    }

    if(this.paginaEd == "" || this.paginaEd == null){
      this.paginaEd= "";
    } else if(this.PaginaEd?.value.length == 0){
      var pagina = $("#editPaginaProyecto").val();
      this.paginaEd = <string>pagina;
    }

    //CREO EL ITEM Y LO AGREGO
    if(this.nombreEd.length>0 &&this.urlEd.length>0 && this.descripcionEd.length>0){
    var items = { "idProyectos":id, "titulo":this.nombreEd, "descripcion":this.descripcionEd, "url":this.urlEd, "pagina":this.paginaEd }
    const url = `https://portafolio-backend-rb21.onrender.com/proyectos/editar`;
    this.datosPortafolio.editarPro(url, items).subscribe();
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editProId");
    asd!.textContent = "";
    $('#editarProyectoModal').modal('hide');
    location.reload();
    }else {
      alert("Porfavor ingresar datos.");
    }
  }
}
