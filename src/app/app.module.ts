import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/menu/menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { ArrendatariosReadComponent } from './components/arrendatarios-read/arrendatarios-read.component';
import { PropietariosReadComponent } from './components/propietarios-read/propietarios-read.component';
import { PagosComponent } from './components/pagos/pagos.component';
import { ProyectosComponent } from './components/proyectos/proyectos.component';
import { ArriendoComponent } from './components/arriendo/arriendo.component';
import { InmuebleComponent } from './components/inmueble/inmueble.component';
import { ArreglosLocativosComponent } from './components/arreglos-locativos/arreglos-locativos.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTreeModule } from '@angular/material/tree';
import { AvatarModule } from 'ngx-avatars';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { FormArrendatarioComponent } from './components/Forms/form-arrendatario/form-arrendatario.component';
import { FormPropietariosComponent } from './components/Forms/form-propietarios/form-propietarios.component';
import { FormPagosComponent } from './components/Forms/form-pagos/form-pagos.component';
import { FormProyectosComponent } from './components/Forms/form-proyectos/form-proyectos.component';
import { FormArriendosComponent } from './components/Forms/form-arriendos/form-arriendos.component';
import { FormInmueblesComponent } from './components/Forms/form-inmuebles/form-inmuebles.component';
import { FormArreglosLocativosComponent } from './components/Forms/form-arreglos-locativos/form-arreglos-locativos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { LoginComponent } from './components/login/login.component';
import { SingInComponent } from './sing-in/sing-in.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ArrendatariosReadComponent,
    PropietariosReadComponent,
    PagosComponent,
    ProyectosComponent,
    ArriendoComponent,
    InmuebleComponent,
    ArreglosLocativosComponent,
    FormArrendatarioComponent,
    FormPropietariosComponent,
    FormPagosComponent,
    FormProyectosComponent,
    FormArriendosComponent,
    FormInmueblesComponent,
    FormArreglosLocativosComponent,
    LoginComponent,
    SingInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    HttpClientModule,
    MatTreeModule,
    AvatarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }