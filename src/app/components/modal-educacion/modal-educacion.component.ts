import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { EducacionComponent } from '../educacion/educacion.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-modal-educacion',
  templateUrl: './modal-educacion.component.html',
  styleUrls: ['./modal-educacion.component.css']
})
export class ModalEducacionComponent implements OnInit{
  institucionAg = '';
  carreraAg = '';
  fechaAg = '';
  imagenAg = '';

  institucionEd = '';
  carreraEd = '';
  fechaEd = '';
  imagenEd = '';

  formAg: FormGroup;
  formEd: FormGroup;
  educacionList:any;

  loadingAg!: boolean;
  loadingEd!: boolean;
  archivosAg:any;
  archivosEd:any;
  base64Ag:any;
  base64Ed:any;

  constructor(private sanitizer:DomSanitizer, private http:HttpClient, private formBuilder: FormBuilder, private datosPortafolio:PortafolioService, private educacionComponent:EducacionComponent){
    this.formAg = this.formBuilder.group({
      institucionAg:['',[Validators.required]],
      carreraAg:['',[Validators.required]],
      fechaAg:['',[Validators.required]],
      imagenAg:['',[Validators.required]]
    })
    this.formEd = this.formBuilder.group({
      institucionEd:['',[Validators.required]],
      carreraEd:['',[Validators.required]],
      fechaEd:['',[Validators.required]],
      imagenEd:['',[Validators.required]]
    })
  }

  ngOnInit(): void{
    this.refreshPeople();
  }
  
  get InstitucionAg(){
    return this.formAg.get("institucionAg");
  }

  get CarreraAg(){
    return this.formAg.get("carreraAg");
  }

  get FechaAg(){
    return this.formAg.get("fechaAg");
  }

  get ImagenAg(){
    return this.formAg.get("imagenAg");
  }

  get InstitucionEd(){
    return this.formEd.get("institucionEd");
  }

  get CarreraEd(){
    return this.formEd.get("carreraEd");
  }

  get FechaEd(){
    return this.formEd.get("fechaEd");
  }

  get ImagenEd(){
    return this.formEd.get("imagenEd");
  }

  get InstitucionAgValid() {
    return this.InstitucionAg?.touched && !this.InstitucionAg?.valid
  }
  get CarreraAgValid() {
    return this.CarreraAg?.touched && !this.CarreraAg?.valid
  }
  get FechaAgValid() {
    return this.FechaAg?.touched && !this.FechaAg?.valid
  }
  get ImagenAgValid() {
    return this.ImagenAg?.touched && !this.ImagenAg?.valid
  }
  get InstitucionEdValid() {
    return this.InstitucionEd?.touched && !this.InstitucionEd?.valid
  }
  get CarreraEdValid() {
    return this.CarreraEd?.touched && !this.CarreraEd?.valid
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
        this.educacionList=data.educacion;
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

  agregarEducacion(){
    this.loadingAg = true;
    //busco el ultimo id y lo configuro
    var ultimo = this.educacionList[this.educacionList.length-1];
    var idd = ultimo.id;
    var palabra = idd.split("-");
    var numero = parseInt(palabra[1]);
    numero = numero + 1;
    var nuevoId = palabra[0]+ "-" + numero;

    //GUARDO VALORES
    this.institucionAg = this.formAg.value.institucionAg;
    this.carreraAg = this.formAg.value.carreraAg;
    this.fechaAg = this.formAg.value.fechaAg;
    this.imagenAg = this.formAg.value.imagenAg;
    
    //CREO EL ITEM Y LO AGREGO
    var items = { "id":nuevoId, "universidad":this.institucionAg, "carrera":this.carreraAg, "fecha":this.fechaAg, "imagen":this.base64Ag.base}
    this.datosPortafolio.agregarEdu(items).subscribe(res => {
      this.loadingAg = false;
      console.log('Respuesta del servidor', res);
    });
    this.educacionComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#educacionModal').modal('hide');
    //location.reload();
  }
  editarEducacion(){
    this.loadingEd = true;
    //GUARDO VALORES
    var id = document.getElementById("editEduId")?.textContent;
    this.institucionEd = this.formEd.value.institucionEd;
    this.carreraEd = this.formEd.value.carreraEd;
    this.fechaEd = this.formEd.value.fechaEd;

    //CREO EL ITEM Y LO AGREGO
    var items = { "id":id, "universidad":this.institucionEd, "carrera":this.carreraEd, "fecha":this.fechaEd, "imagen":this.base64Ed.base}
    const url = `http://localhost:3000/educacion/${id}`;
    this.datosPortafolio.editarEdu(url, items).subscribe(res => {
      this.loadingEd = false;
      console.log('Respuesta del servidor', res);
    });
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editEduId");
    asd!.textContent = "";
    $('#editarEducacionModal').modal('hide');
    //location.reload();
  }
/* agregarEducacion():void{
    //busco el ultimo id y lo configuro
    var ultimo = this.educacionList[this.educacionList.length-1];
    var idd = ultimo.id;
    var palabra = idd.split("-");
    var numero = parseInt(palabra[1]);
    numero = numero + 1;
    var nuevoId = palabra[0]+ "-" + numero;

    //configuro id para imagen
    var idimagen = "imagenn"+numero;
    console.log("soy el id de la imagen"+idimagen);

    this.institucionAg = this.form.value.institucionAg;
    this.carreraAg = this.form.value.carreraAg;
    this.fechaInicioAg = this.form.value.fechaInicioAg;
    this.fechaFinAg = this.form.value.fechaFinAg;
    this.imagenAg = this.form.value.imagenAg;

    var items = { "id":nuevoId, "universidad":this.institucionAg, "carrera":this.carreraAg, "fechaInicio":this.fechaInicioAg , "fechaFin":this.fechaFinAg, "imagen":""}
    var file = (<HTMLInputElement>document.getElementById("subimg")).files![0];
    this.datosPortafolio.agregarEdu(items);
    this.educacionComponent.refreshPeople();
    $(".modal-body input").val('');
    $('#educacionModal').modal('hide');
    location.reload();
    this.agregarImg(nuevoId, file);
  }
  agregarImg(id:string,file:File){

    var filess = file;

    const read = new FileReader();
    read.onload = function(){
        var imagenn = document.getElementById(id);
        var cambio = imagenn!.querySelector("img");
        console.log(cambio)
        console.log(imagenn)
        const result = this.result;
        const url = result?.toString();
        cambio?.setAttribute('src', url!);
        console.log(cambio)
    }   
    read.readAsDataURL(filess);
    alert("guardado exitoso");
  }*/
}
