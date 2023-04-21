import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlquilerComponent } from './component/alquiler/alquiler.component';
import { ComprasComponent } from './component/compras/compras.component';
import { ListarUsuariosComponent } from './component/listar-usuarios/listar-usuarios.component';
import { LoginComponent } from './component/login/login.component';
import { MenuComponent } from './component/menu/menu.component';
import { RegistroComponent } from './component/registro/registro.component';
import { ReservaComponent } from './component/reserva/reserva.component';
import { VentaComponent } from './component/venta/venta.component';

const routes: Routes = [
  { path: '', redirectTo: '/menu', pathMatch: 'full' },
  { path: 'listarUsuarios', component:ListarUsuariosComponent},
  { path: 'menu', component:MenuComponent},
  { path: 'alquiler', component: AlquilerComponent },
  { path: 'ventas', component: VentaComponent },
  { path: 'reservas', component: ReservaComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'registros', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
