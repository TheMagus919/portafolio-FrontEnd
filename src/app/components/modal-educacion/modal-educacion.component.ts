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
  get ImagenEdValid() {
    return this.ImagenEd?.touched && !this.ImagenEd?.valid
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosEducacion()
      .subscribe(data => {
        this.educacionList=data;
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

    //GUARDO VALORES
    this.institucionAg = this.formAg.value.institucionAg;
    this.carreraAg = this.formAg.value.carreraAg;
    this.fechaAg = this.formAg.value.fechaAg;
    this.imagenAg = this.formAg.value.imagenAg;
    
    //SI ES VALIDO CREO EL ITEM Y LO AGREGO
    if(this.InstitucionAg?.value.length > 0 && this.CarreraAg?.value.length > 0 && this.FechaAg?.value.length > 0 && this.ImagenAg?.value.length > 0 &&!this.InstitucionAgValid &&!this.ImagenAgValid &&!this.FechaAgValid && !this.CarreraAgValid){
    var items = { "universidad":this.institucionAg, "carrera":this.carreraAg, "fecha":this.fechaAg, "imagen":this.base64Ag.base}
    this.datosPortafolio.agregarEdu(items).subscribe(res => {
      this.loadingAg = false;
      console.log('Respuesta del servidor', res);
    });
    this.educacionComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#educacionModal').modal('hide');
    location.reload();
    }else {
      this.loadingAg = false;
      alert("Porfavor ingresar datos");
  }
  }

  editarEducacion(){
    this.loadingEd = true;
    //GUARDO VALORES
    var id = document.getElementById("editEduId")?.textContent;
    this.institucionEd = this.formEd.value.institucionEd;
    this.carreraEd = this.formEd.value.carreraEd;
    this.fechaEd = this.formEd.value.fechaEd;
    
    //SI LOS VALORES SIGUEN POR DEFECTO LOS ASGINO OTRA VEZ
    if(this.InstitucionEd?.value.length == 0){
      var institucion = $("#editInstitucionEducacion").val();
      this.institucionEd = <string>institucion;
    }
    if(this.CarreraEd?.value.length == 0){
      var carrera = $("#editCarreraEducacion").val();
      this.carreraEd = <string>carrera;
    }
    if(this.FechaEd?.value.length == 0){
      var fecha =$("#editFechaEducacion").val();
      this.fechaEd = <string>fecha;
    }

    //SI ES VALIDO CREO EL ITEM Y LO AGREGO
    if(this.ImagenEd?.value.length > 0 && !this.ImagenEdValid ){
    var items = { "idEducacion":id, "universidad":this.institucionEd, "carrera":this.carreraEd, "fecha":this.fechaEd, "imagen":this.base64Ed.base}
    const url = `https://portafolio-backend-rb21.onrender.com/educacion/editar`;
    this.datosPortafolio.editarEdu(url, items).subscribe(res => {
      this.loadingEd = false;
      console.log('Respuesta del servidor', res);
    });
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editEduId");
    asd!.textContent = "";
    $('#editarEducacionModal').modal('hide');
    location.reload();
  }else {
    this.loadingEd = false;
    alert("Porfavor ingresar datos");
  }
  }
}
