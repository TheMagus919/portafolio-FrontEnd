import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortafolioService } from 'src/app/servicios/portafolio.service';

@Component({
  selector: 'app-modal-habilidades',
  templateUrl: './modal-habilidades.component.html',
  styleUrls: ['./modal-habilidades.component.css']
})
export class ModalHabilidadesComponent {
  nombreAg = '';
  porcentajeAg = '';

  nombreEd = '';
  porcentajeEd = '';

  formAg: FormGroup;
  formEd: FormGroup;
  habilidadesList:any;
  
  constructor(private http:HttpClient, private formBuilder: FormBuilder, private datosPortafolio:PortafolioService){
    this.formAg = this.formBuilder.group({
      nombreAg:['',[Validators.required]],
      porcentajeAg:['',[Validators.required]]
    })
    this.formEd = this.formBuilder.group({
      nombreEd:['',[Validators.required]],
      porcentajeEd:['',[Validators.required]]
    })
  }

  get NombreAg(){
    return this.formAg.get("nombreAg");
  }
  get PorcentajeAg(){
    return this.formAg.get("porcentajeAg");
  }
  get NombreEd(){
    return this.formEd.get("nombreEd");
  }
  get PorcentajeEd(){
    return this.formEd.get("porcentajeEd");
  }
  get NombreAgValid() {
    return this.NombreAg?.touched && !this.NombreAg?.valid
  }
  get PorcentajeAgValid() {
    return this.PorcentajeAg?.touched && !this.PorcentajeAg?.valid
  }
  get PorcentajeEdValid() {
    return this.PorcentajeEd?.touched && !this.PorcentajeEd?.valid
  }
  ngOnInit(): void{
    this.refreshPeople();
  }

  refreshPeople() {
    this.datosPortafolio.obtenerDatosHabilidades()
      .subscribe(data => {
        this.habilidadesList=data;
      })      
  }
  agregarHabilidad(){
    //GUARDO VALORES
    this.nombreAg = this.formAg.value.nombreAg;
    this.porcentajeAg = this.formAg.value.porcentajeAg;

    //CREO EL WIDTH
    var width = this.porcentajeAg+"%";

    //SI ES VALIDO CREO EL ITEM Y LO AGREGO
    if(this.NombreAg?.value.length > 0 && this.PorcentajeAg?.value.length > 0 && !this.NombreAgValid && !this.PorcentajeAgValid){
    var items = { "nombre":this.nombreAg, "porcentaje":this.porcentajeAg, "width":width }
    this.datosPortafolio.agregarHab(items).subscribe();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#habilidadModal').modal('hide');
    location.reload();
    }else{
      alert("Porfavor ingresar datos.")
    }
  }

  editarHabilidad(){
    //GUARDO VALORES
    var dsa = document.getElementById("editId")?.textContent;
    var mismoId = dsa;
    this.nombreEd = this.formEd.value.nombreEd;
    this.porcentajeEd = this.formEd.value.porcentajeEd;
    
    //SI LOS VALORES SIGUEN POR DEFECTO LOS ASGINO OTRA VEZ
    if(this.NombreEd?.value.length == 0){
      var as = $("#editNombreHab").val();
      this.nombreEd = <string>as;
    }

    //CREO EL WIDTH
    var width = this.porcentajeEd+"%";

    //SI ES VALIDO CREO EL ITEM Y LO AGREGO
    if(this.PorcentajeEd?.value.length > 0 && !this.PorcentajeEdValid){
    var items = { "idHabilidades":mismoId, "nombre":this.nombreEd, "porcentaje":this.porcentajeEd, "width":width }
    const url = `https://portafolio-backend-rb21.onrender.com/habilidades/editar`;
    this.datosPortafolio.editarHab(url, items).subscribe();
    alert("Se Edito Correctamente.")
    $(".modal-body input").val('');
    var asd = document.getElementById("editId");
    asd!.textContent = "";
    $('#editarHabilidadModal').modal('hide');
    location.reload();
    }else {
      alert("Porfavor ingresar datos.")
    }
  }

}
