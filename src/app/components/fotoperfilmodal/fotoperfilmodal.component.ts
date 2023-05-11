import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { BannerComponent } from '../banner/banner.component';

@Component({
  selector: 'app-fotoperfilmodal',
  templateUrl: './fotoperfilmodal.component.html',
  styleUrls: ['./fotoperfilmodal.component.css']
})
export class FotoperfilmodalComponent {
  loadingAg!: boolean;
  archivosAg:any;
  base64Ag:any;
constructor(private sanitizer:DomSanitizer, private http:HttpClient, private datosPortafolio:PortafolioService, private bannerComponent:BannerComponent){
}
//CAPTURO IMAGEN
onFileSelected(event:any){
  var archivoCapturadoAg = event.target!.files[0];
  this.extraerBase64(archivoCapturadoAg).then(imagen => {
    this.base64Ag = imagen;
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

  agregarImagen(){
    this.loadingAg = true;
    //CREO EL ITEM Y LO AGREGO
    var items = { "imagen":this.base64Ag.base}
    const url = `http://localhost:3000/fotoperfil`;
    this.datosPortafolio.cambiarImg(url, items).subscribe(res => {
      this.loadingAg = false;
      console.log('Respuesta del servidor', res);
    });
    this.bannerComponent.refreshPeople();
    alert("Se Agrego Correctamente.")
    $(".modal-body input").val('');
    $('#cambiarFotoModal').modal('hide');
    //location.reload();
  }
}
