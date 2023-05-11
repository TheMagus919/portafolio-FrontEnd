import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { ExperienciaComponent } from '../experiencia/experiencia.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-experiencia',
  templateUrl: './modal-experiencia.component.html',
  styleUrls: ['./modal-experiencia.component.css']
})
export class ModalExperienciaComponent implements OnInit{
  ocupacionAg = '';
  localAg = '';
  fechaAg = '';
  ciudadAg = '';
  jornadaAg = '';
  imagenAg = '';

  ocupacionEd = '';
  localEd = '';
  jornadaEd = '';
  ciudadEd = '';
  fechaEd = '';
  imagenEd = '';

  formAg: FormGroup;
  formEd: FormGroup;
  experienciaList:any;

  loadingAg!: boolean;
  loadingEd!: boolean;
  archivosAg:any;
  archivosEd:any;
  base64Ag:any;
  base64Ed:any;

  constructor(private sanitizer:DomSanitizer, private http:HttpClient, private formBuilder: FormBuilder, private datosPortafolio:PortafolioService, private experienciaComponent:ExperienciaComponent){
    this.formAg = this.formBuilder.group({
      ocupacionAg:['',[Validators.required]],
      localAg:['',[Validators.required]],
      fechaAg:['',[Validators.required]],
      ciudadAg:['',[Validators.required]],
      jornadaAg:['',[Validators.required]],
      imagenAg:['',[Validators.required]]
    })
    this.formEd = this.formBuilder.group({
      ocupacionEd:['',[Validators.required]],
      localEd:['',[Validators.required]],
      fechaEd:['',[Validators.required]],
      ciudadEd:['',[Validators.required]],
      jornadaEd:['',[Validators.required]],
      imagenEd:['',[Validators.required]]
    })
  }

  ngOnInit(): void{
    this.refreshPeople();
  }
  
  get OcupacionAg(){
    return this.formAg.get("institucionAg");
  }
  get LocalAg(){
    return this.formAg.get("localAg");
  }
  get CiudadAg(){
    return this.formAg.get("ciudadAg");
  }
  get JornadaAg(){
    return this.formAg.get("jornadaAg");
  }
  get FechaAg(){
    return this.formAg.get("fechaAg");
  }
  get ImagenAg(){
    return this.formAg.get("imagenAg");
  }
  get OcupacionEd(){
    return this.formEd.get("ocupacionEd");
  }
  get LocalEd(){
    return this.formEd.get("localEd");
  }
  get CiudadEd(){
    return this.formEd.get("ciudadEd");
  }
  get JornadaEd(){
    return this.formEd.get("jornadaEd");
  }
  get FechaEd(){
    return this.formEd.get("fechaEd");
  }
  get ImagenEd(){
    return this.formEd.get("imagenEd");
  }
  get OcupacionAgValid() {
    return this.OcupacionAg?.touched && !this.OcupacionAg?.valid
  }
  get CiudadAgValid() {
    return this.CiudadAg?.touched && !this.CiudadAg?.valid
  }
  get JornadaAgValid() {
    return this.JornadaAg?.touched && !this.JornadaAg?.valid
  }
  get LocalAgValid() {
    return this.LocalAg?.touched && !this.LocalAg?.valid
  }
  get FechaAgValid() {
    return this.FechaAg?.touched && !this.FechaAg?.valid
  }
  get ImagenAgValid() {
    return this.ImagenAg?.touched && !this.ImagenAg?.valid
  }
  get OcupacionEdValid() {
    return this.OcupacionEd?.touched && !this.OcupacionEd?.valid
  }
  get LocalEdValid() {
    return this.LocalEd?.touched && !this.LocalEd?.valid
  }
  get CiudadEdValid() {
    return this.CiudadEd?.touched && !this.CiudadEd?.valid
  }
  get JornadaEdValid() {
    return this.JornadaEd?.touched && !this.JornadaEd?.valid
  }
  get FechaEdValid() {
    return this.FechaEd?.touched && !this.FechaEd?.valid
  }
  get ImagenEdValid() {
    return this.ImagenEd?.touched && !this.ImagenEd?.valid
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatos()
      .subscribe(data => {
        this.experienciaList=data.experiencias;
      })      
  }

  //CAPTURO IMAGEN
  onFileSelectedAg(event:any){
    var archivoCapturadoAg = event.target!.files[0];
    this.extraerBase64(archivoCapturadoAg).then(imagen => {
      this.base64Ag = imagen;
    })
  }
  onFileSelectedEd(event:any){
    var archivoCapturadoEd = event.target!.files[0];
    this.extraerBase64(archivoCapturadoEd).then(imagen => {
      this.base64Ed = imagen;
    })
  }
  //CONVERSOR DE IMAGEN A BASE64
  extraerBase64 = ($event: any) => {
    return new Promise((resolve, reject) => {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    });
  };

  agregarExperiencia(){
    this.loadingAg = true;
    //busco el ultimo id y lo configuro
    var ultimo = this.experienciaList[this.experienciaList.length-1];
    var idd = ultimo.id;
    var palabra = idd.split("-");
    var numero = parseInt(palabra[1]);
    numero = numero + 1;
    var nuevoId = palabra[0]+ "-" + numero;

    //GUARDO VALORES
    this.ocupacionAg = this.formAg.value.ocupacionAg;
    this.localAg = this.formAg.value.localAg;
    this.fechaAg = this.formAg.value.fechaAg;
    this.ciudadAg = this.formAg.value.ciudadAg;
    this.jornadaAg = this.formAg.value.jornadaAg;
    
    //CREO EL ITEM Y LO AGREGO
    var items = { "id":nuevoId, "idImagen":"", "puesto":this.ocupacionAg, "local":this.localAg,"jornada":this.jornadaAg, "fecha":this.fechaAg,"ciudad":this.ciudadAg , "imagen":this.base64Ag.base}
    this.datosPortafolio.agregarExp(items).subscribe(res => {
      this.loadingAg = false;
      console.log('Respuesta del servidor', res);
    });
    this.experienciaComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#experienciaModal').modal('hide');
    //location.reload();
  }

  editarExperiencia(){
    this.loadingEd = true;
    //GUARDO VALORES
    var id = document.getElementById("editExpId")?.textContent;
    this.ocupacionEd = this.formEd.value.ocupacionEd;
    this.localEd = this.formEd.value.localEd;
    this.fechaEd = this.formEd.value.fechaEd;
    this.ciudadEd = this.formEd.value.ciudadEd;
    this.jornadaEd = this.formEd.value.jornadaEd;

    //CREO EL ITEM Y LO AGREGO
    var items = { "id":id, "idImagen":"", "puesto":this.ocupacionEd, "local":this.localEd,"jornada":this.jornadaEd, "fecha":this.fechaEd,"ciudad":this.ciudadEd , "imagen":this.base64Ed.base }
    const url = `http://localhost:3000/experiencias/${id}`;
    this.datosPortafolio.editarExp(url, items).subscribe(res => {
      this.loadingEd = false;
      console.log('Respuesta del servidor', res);
    });
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editExpId");
    asd!.textContent = "";
    $('#editarExperienciaModal').modal('hide');
    //location.reload();
  }
}
