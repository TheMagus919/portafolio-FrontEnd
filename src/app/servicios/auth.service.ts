import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = 'http://localhost:5000/api';
  token: any;
  constructor(private http: HttpClient) { }

  login(user: string, password: string){
    this.http.post(this.url+ '/authenticate', {user: user, password: password}).subscribe(
    (resp:any) => {
      localStorage.setItem('auth_token', resp.token);
      $('#loginModal').modal('hide');
    },
    (err) => {
      console.log(err);
      alert("Usuario no valido.")
    });;
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
