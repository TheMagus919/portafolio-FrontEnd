import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'https://portafolio-backend-rb21.onrender.com/login';
  token: any;
  constructor(private http: HttpClient) { }

  async login(user: string, password: string) {
    let datos = { "user":user, "password": password };
    const request = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    });
  
    const respuesta = await request.text();
    if (respuesta != 'FAIL') {
      localStorage.setItem('auth_token', respuesta);
      $('#loginModal').modal('hide');
    } else {
      alert("Las credenciales son incorrectas. Por favor intente nuevamente.");
    }
  
  }

  pregunta(){
    var a = confirm("¿Estas seguro de que deseas Cerrar Sesion?");
    if(a == true){
      this.logout();
    }
  }
  logout(){
    localStorage.removeItem('auth_token');
  }

  public get logIn(): boolean {
    return (localStorage.getItem('auth_token') !== null);
  }
}
