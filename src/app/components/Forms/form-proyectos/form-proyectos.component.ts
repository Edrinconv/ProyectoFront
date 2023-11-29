import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProyectosModels } from 'src/app/Models/ProyectosModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-proyectos',
  templateUrl: './form-proyectos.component.html',
  styleUrls: ['./form-proyectos.component.css']
})
export class FormProyectosComponent {

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog,
    public modalService: ModalService
  ) {

  }

  titulo=""
  accion=""

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    MatriculaInmobiliaria: [null, Validators.required],
    EscrituraReglamento: [null, Validators.required],
    NombreProyecto: [null, Validators.required],
    DireccionProyecto: [null, Validators.required],
    Estrato: [null, Validators.required],
    NombreAdministrador: [null, Validators.required],
    TelefonoAdministrador: [null, Validators.required],
    CorreoAdministrador: [null, Validators.required]
  });

  infoProyectos: ProyectosModels = {

    MatriculaInmobiliariaProyecto: 0,
    NombreProyecto: "",
    DireccionProyecto: "",
    EstratoProyecto: 0,
    EscrituraReglamentoProyecto: "",
    AdministradorProyecto: "",
    TelefonoAdministradorProyecto: "",
    CorreoAdministradorProyecto: "",
  }

  ngOnInit(): void{
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    
    if(this.modalService.accion.value == "Editar"){
      this.addressForm.controls.MatriculaInmobiliaria.setValue(
        this.modalService.proyectos['matricula']
      );
      this.addressForm.controls.EscrituraReglamento.setValue(
        this.modalService.proyectos['escritura']
      );
      this.addressForm.controls.NombreProyecto.setValue(
        this.modalService.proyectos['proyecto']
      );
      this.addressForm.controls.DireccionProyecto.setValue(
        this.modalService.proyectos['direccion']
      );
      this.addressForm.controls.Estrato.setValue(
        this.modalService.proyectos['estrato']
      );
      this.addressForm.controls.NombreAdministrador.setValue(
        this.modalService.proyectos['administrador']
      );
      this.addressForm.controls.TelefonoAdministrador.setValue(
        this.modalService.proyectos['telefono']
      );
      this.addressForm.controls.CorreoAdministrador.setValue(
        this.modalService.proyectos['correo']
      );
    }
  }

  onSubmit(){
    this.titulo=this.modalService.titulo
    this.accion=this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar"){
      if (this.addressForm.valid) {
        this.infoProyectos.MatriculaInmobiliariaProyecto = this.addressForm.controls['MatriculaInmobiliaria'].value;
        this.infoProyectos.EscrituraReglamentoProyecto = this.addressForm.controls['EscrituraReglamento'].value;
        this.infoProyectos.NombreProyecto = this.addressForm.controls['NombreProyecto'].value;
        this.infoProyectos.DireccionProyecto = this.addressForm.controls['DireccionProyecto'].value;
        this.infoProyectos.EstratoProyecto = this.addressForm.controls['Estrato'].value;
        this.infoProyectos.AdministradorProyecto = this.addressForm.controls['NombreAdministrador'].value;
        this.infoProyectos.TelefonoAdministradorProyecto = this.addressForm.controls['TelefonoAdministrador'].value;
        this.infoProyectos.CorreoAdministradorProyecto = this.addressForm.controls['CorreoAdministrador'].value;
  
        this.dialog.closeAll();
        this.apiService.post('Proyectos', this.infoProyectos).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El proyecto ha sido creado',
              icon: 'success',
              color: '#7b1fa2',
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message: ${error.message}`,
            `error`
          )
        })
      } else {
        Swal.fire(
          'Ingresar los datos',
          'Por favor ingrese todos los campos requeridos',
          'error'
        )
      }
    }else{

      if (this.addressForm.valid) {
        this.infoProyectos.MatriculaInmobiliariaProyecto = this.addressForm.controls['MatriculaInmobiliaria'].value;
        this.infoProyectos.EscrituraReglamentoProyecto = this.addressForm.controls['EscrituraReglamento'].value;
        this.infoProyectos.NombreProyecto = this.addressForm.controls['NombreProyecto'].value;
        this.infoProyectos.DireccionProyecto = this.addressForm.controls['DireccionProyecto'].value;
        this.infoProyectos.EstratoProyecto = this.addressForm.controls['Estrato'].value;
        this.infoProyectos.AdministradorProyecto = this.addressForm.controls['NombreAdministrador'].value;
        this.infoProyectos.TelefonoAdministradorProyecto = this.addressForm.controls['TelefonoAdministrador'].value;
        this.infoProyectos.CorreoAdministradorProyecto = this.addressForm.controls['CorreoAdministrador'].value;
  
        this.dialog.closeAll();
        this.apiService.update('Proyectos', this.infoProyectos, String(this.modalService.proyectos['matricula'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El proyecto ha sido editado',
              icon: 'success',
              color: '#7b1fa2',
            })
          }
        }).catch(error => {
          Swal.fire(
            `Status error ${error.status}`,
            `Message EDITAR: ${error.message}`,
            `error`
          )
        })
      } else {
        Swal.fire(
          'Ingresar los datos',
          'Por favor ingrese todos los campos requeridos',
          'error'
        )
      }
    }
  }

}
