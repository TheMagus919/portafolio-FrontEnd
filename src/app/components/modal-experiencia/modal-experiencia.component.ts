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
    return this.formAg.get("ocupacionAg");
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
  get JornadaEdValid() {
    return this.JornadaEd?.touched && !this.JornadaEd?.valid
  }
  get ImagenEdValid() {
    return this.ImagenEd?.touched && !this.ImagenEd?.valid
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosExperiencias()
      .subscribe(data => {
        this.experienciaList=data;
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

    //GUARDO VALORES
    this.ocupacionAg = this.formAg.value.ocupacionAg;
    this.localAg = this.formAg.value.localAg;
    this.fechaAg = this.formAg.value.fechaAg;
    this.ciudadAg = this.formAg.value.ciudadAg;
    this.jornadaAg = this.formAg.value.jornadaAg;

    //SI ES VALIDA CREO EL ITEM Y LO AGREGO
    if(this.OcupacionAg?.value.length > 0 && this.LocalAg?.value.length > 0 && this.FechaAg?.value.length > 0 && this.CiudadAg?.value.length > 0 && this.JornadaAg?.value.length > 0 && this.ImagenAg?.value.length > 0 && !this.OcupacionAgValid && !this.FechaAgValid && !this.JornadaAgValid && !this.LocalAgValid && !this.ImagenAgValid && !this.CiudadAgValid){
    var items = { "puesto":this.ocupacionAg, "local":this.localAg, "jornada":this.jornadaAg, "fecha":this.fechaAg,"ciudad":this.ciudadAg , "imagen":this.base64Ag.base}
    this.datosPortafolio.agregarExp(items).subscribe(res => {
      this.loadingAg = false;
      console.log('Respuesta del servidor', res);
    });
    this.experienciaComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#experienciaModal').modal('hide');
    location.reload();
  } else {
    this.loadingAg = false;
    alert("Porfavor ingresar los datos.")
  }
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

    //SI LOS VALORES SIGUEN POR DEFECTO LOS ASGINO OTRA VEZ
    if(this.OcupacionEd?.value.length == 0){
      var ocupacion = $("#editOcupacionExperiencia").val();
      this.ocupacionEd = <string>ocupacion;
    }
    if(this.LocalEd?.value.length == 0){
      var local = $("#editLocalExperiencia").val();
      this.localEd = <string>local;
    }
    if(this.FechaEd?.value.length == 0){
      var fecha = $("#editFechaExperiencia").val();
      this.fechaEd = <string>fecha;
    }
    if(this.CiudadEd?.value.length == 0){
      var ciudad = $("#editCiudadExperiencia").val();
      this.ciudadEd = <string>ciudad;
    }

    //SI ES VALIDO CREO EL ITEM Y LO AGREGO
    if(this.JornadaEd?.value.length > 0 && this.ImagenEd?.value.length > 0 && !this.JornadaEdValid && !this.ImagenEdValid){
    var items = { "idExperiencias":id, "puesto":this.ocupacionEd, "local":this.localEd,"jornada":this.jornadaEd, "fecha":this.fechaEd,"ciudad":this.ciudadEd , "imagen":this.base64Ed.base }
    const url = `https://portafolio-backend-rb21.onrender.com//experiencias/editar`;
    this.datosPortafolio.editarExp(url, items).subscribe(res => {
      this.loadingEd = false;
      console.log('Respuesta del servidor', res);
    });
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editExpId");
    asd!.textContent = "";
    $('#editarExperienciaModal').modal('hide');
    location.reload();
  }else {
    this.loadingEd = false;
    alert("Porfavor ingresar los datos.")
  }
  }
}
