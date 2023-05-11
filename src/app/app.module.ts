import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { AcercaDeComponent } from './components/acerca-de/acerca-de.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { EducacionComponent } from './components/educacion/educacion.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { HabilidadesComponent } from './components/habilidades/habilidades.component';
import { PortafolioService } from 'src/app/servicios/portafolio.service';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from 'src/app/servicios/auth.service';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";
import { ModalEducacionComponent } from './components/modal-educacion/modal-educacion.component';
import { ModalHabilidadesComponent } from './components/modal-habilidades/modal-habilidades.component';
import { ModalProyectosComponent } from './components/modal-proyectos/modal-proyectos.component';
import { ModalExperienciaComponent } from './components/modal-experiencia/modal-experiencia.component';
import { ModalperfilComponent } from './components/modalperfil/modalperfil.component';
import { FotoperfilmodalComponent } from './components/fotoperfilmodal/fotoperfilmodal.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerComponent,
    AcercaDeComponent,
    ExperienciaComponent,
    EducacionComponent,
    ProyectosComponent,
    HabilidadesComponent,
    LoginComponent,
    ModalEducacionComponent,
    ModalHabilidadesComponent,
    ModalProyectosComponent,
    ModalExperienciaComponent,
    ModalperfilComponent,
    FotoperfilmodalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PortafolioService, AuthService, EducacionComponent, ExperienciaComponent, ProyectosComponent, BannerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
