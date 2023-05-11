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
  get PaginaAg(){
    return this.formAg.get("paginaAg");
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
  get PaginaAgValid() {
    return this.PaginaAg?.touched && !this.PaginaAg?.valid
  }

  get NombreEdValid() {
    return this.NombreEd?.touched && !this.NombreEd?.valid
  }
  get UrlEdValid() {
    return this.UrlEd?.touched && !this.UrlEd?.valid
  }
  get DescripcionEdValid() {
    return this.DescripcionEd?.touched && !this.DescripcionEd?.valid
  }
  get PaginaEdValid() {
    return this.PaginaEd?.touched && !this.PaginaEd?.valid
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.proyectosList=data.proyectos;
      })      
  }

  agregarProyecto(){
    //busco el ultimo id y lo configuro
    var ultimo = this.proyectosList[this.proyectosList.length-1];
    var idd = ultimo.id;
    var palabra = idd.split("-");
    var numero = parseInt(palabra[1]);
    numero = numero + 1;
    var nuevoId = palabra[0]+ "-" + numero;

    //GUARDO VALORES
    this.nombreAg = this.formAg.value.nombreAg;
    this.urlAg = this.formAg.value.urlAg;
    this.descripcionAg = this.formAg.value.descripcionAg;
    this.paginaAg = this.formAg.value.paginaAg;
    
    if(this.paginaAg == "" || this.paginaAg == null){
      this.paginaAg= "";
    }

    //CREO EL ITEM Y LO AGREGO
    var items = { "id":nuevoId, "titulo":this.nombreAg, "descripcion":this.descripcionAg, "url":this.urlAg, "pagina":this.paginaAg }
    this.datosPortafolio.agregarPro(items).subscribe();
    this.proyectosComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#proyectosModal').modal('hide');
    //location.reload();
  }

  editarProyecto(){
    //GUARDO VALORES
    var id = document.getElementById("editProId")?.textContent;
    this.nombreEd = this.formEd.value.nombreEd;
    this.urlEd = this.formEd.value.urlEd;
    this.descripcionEd = this.formEd.value.descripcionEd;
    this.paginaEd = this.formEd.value.paginaEd;

    if(this.paginaEd == "" || this.paginaEd == null){
      this.paginaEd= "";
    }

    //CREO EL ITEM Y LO AGREGO
    var items = { "id":id, "titulo":this.nombreEd, "descripcion":this.descripcionEd, "url":this.urlEd, "pagina":this.paginaEd }
    const url = `http://localhost:3000/proyectos/${id}`;
    this.datosPortafolio.editarPro(url, items).subscribe();
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editProId");
    asd!.textContent = "";
    $('#editarProyectoModal').modal('hide');
    //location.reload();
  }
}
