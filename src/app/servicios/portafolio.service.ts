import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
const urlEdu = 'http://localhost:3000/educacion';
const urlHab = 'http://localhost:3000/habilidades';
const urlExp = 'http://localhost:3000/experiencias';
const urlPro = 'http://localhost:3000/proyectos';



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

    obtenerDatos():Observable<any>{
      return this.http.get('./assets/data/data.json');
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

