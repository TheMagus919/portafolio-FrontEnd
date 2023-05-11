import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
const urlEdu = 'https://portafolio-backend-rb21.onrender.com/educacion/agregar';
const urlHab = 'https://portafolio-backend-rb21.onrender.com/habilidades/agregar';
const urlExp = 'https://portafolio-backend-rb21.onrender.com/experiencias/agregar';
const urlPro = 'https://portafolio-backend-rb21.onrender.com/proyectos/agregar';

const urlEd = 'https://portafolio-backend-rb21.onrender.com/educacion';
const urlHa = 'https://portafolio-backend-rb21.onrender.com/habilidades';
const urlEx = 'https://portafolio-backend-rb21.onrender.com/experiencias';
const urlPr = 'https://portafolio-backend-rb21.onrender.com/proyectos';
const urlPerf = 'https://portafolio-backend-rb21.onrender.com/perfil/1';


@Injectable({
  providedIn: 'root'
})

export class PortafolioService {
  private refresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http:HttpClient) { }

    public getRefresh(): Observable<boolean> {
      return this.refresh.asObservable();
    }

    public setRefresh(value: boolean): void {
      this.refresh.next(value);
    }

    obtenerDatosPerfil():Observable<any>{
      return this.http.get(urlPerf);
    }
    obtenerDatosEducacion():Observable<any>{
      return this.http.get(urlEd);
    }
    obtenerDatosExperiencias():Observable<any>{
      return this.http.get(urlEx);
    }
    obtenerDatosHabilidades():Observable<any>{
      return this.http.get(urlHa);
    }
    obtenerDatosProyectos():Observable<any>{
      return this.http.get(urlPr);
    }

    guardarImagen(url:string,data:any){
      return this.http.post(url, data);
    }
    // METODOS EDUCACION
    // Creamos el método para realizar envios de información (POST).
    agregarEdu(data:any){
      return this.http.post(urlEdu, data);
    }

    // Creamos el método para realizar envios de información (POST).
    editarEdu(url: string, data: any): Observable<any> {
      return this.http.put(url, data);
    }

    // Creamos el método para eliminar información (DELETE).
    eliminarEdu(url: string, data: any): Observable<any> {
      return this.http.delete(url, data);
    }

    //METODOS EXPERIENCIA
    // Creamos el método para realizar envios de información (POST).
    agregarExp(data:any){
      return this.http.post(urlExp, data);
    }

    // Creamos el método para realizar envios de información (POST).
    editarExp(url: string, data: any): Observable<any> {
      return this.http.put(url, data);
    }

    // Creamos el método para eliminar información (DELETE).
    eliminarExp(url: string, data: any): Observable<any> {
      return this.http.delete(url, data);
    }

    //METODOS HABILIDADES
    // Creamos el método para realizar envios de información (POST).
    agregarHab(data:any){
      return this.http.post(urlHab, data);
    }

    // Creamos el método para realizar envios de información (POST).
    editarHab(url: string, data: any): Observable<any> {
      return this.http.put(url, data);
    }

    // Creamos el método para eliminar información (DELETE).
    eliminarHab(url: string, data: any): Observable<any> {
      return this.http.delete(url, data);
    }

    //METODOS PROYECTOS
    // Creamos el método para realizar envios de información (POST).
    agregarPro(data:any){
      return this.http.post(urlPro, data);
    }

    // Creamos el método para realizar envios de información (POST).
    editarPro(url: string, data: any): Observable<any> {
      return this.http.put(url, data);
    }

    // Creamos el método para eliminar información (DELETE).
    eliminarPro(url: string, data: any): Observable<any> {
      return this.http.delete(url, data);
    }

    //METODOS PERFIL
    // Creamos el método para realizar envios de información (POST).
    editarPer(url: string, data: any): Observable<any> {
      return this.http.put(url, data);
    }

    //METODOS ACERCADE
    // Creamos el método para realizar envios de información (POST).
    editarAce(url: string, data: any): Observable<any> {
      return this.http.put(url, data);
    }

    //METODO FOTO PERFIL
    cambiarImg(url: string, data: any): Observable<any>{
      return this.http.put(url, data);
    }
  }

