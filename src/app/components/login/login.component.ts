import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit{
  user = '';
  password = '';
  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService) {
    this.form = this.formBuilder.group({
      password:['',[Validators.required, Validators.minLength(4)]],
      user:['',[Validators.required]]
    })
  }
  ngOnInit() { 
  }
  
  get Password(){
    return this.form.get("password");
  }

  get User(){
    return this.form.get("user");
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  get UserValid() {
    return this.User?.touched && !this.User?.valid
  }
  
  Login(){
    this.user = this.form.value.user;
    this.password = this.form.value.password;
    this.authService.login(this.user, this.password);
    $(".modal-body input").val('');
  }

  onEnviar(event: Event){
    // Detenemos la propagación o ejecución del compotamiento submit de un form
    event.preventDefault; 

    if (this.form.valid){
      this.Login();
    }else{
      // Corremos todas las validaciones para que se ejecuten los mensajes de error en el template   
      this.form.markAllAsTouched(); 
    }

  }
}
