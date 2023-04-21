import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservaComponent } from './component/reserva/reserva.component';
import { VentaComponent } from './component/venta/venta.component';
import { RegistroComponent } from './component/registro/registro.component';
import { ComprasComponent } from './component/compras/compras.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { AlquilerComponent } from './component/alquiler/alquiler.component';
import { ListarUsuariosComponent } from './component/listar-usuarios/listar-usuarios.component';



@NgModule({
  declarations: [
    AppComponent,
    ReservaComponent,
    VentaComponent,
    RegistroComponent,
    ComprasComponent,
    LoginComponent,
    MenuComponent,
    AlquilerComponent,
    ListarUsuariosComponent
  ],
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
 }
