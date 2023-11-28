import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArrendatariosModels } from 'src/app/Models/ArrendatariosModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-arrendatario',
  templateUrl: './form-arrendatario.component.html',
  styleUrls: ['./form-arrendatario.component.css']
})
export class FormArrendatarioComponent {

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
    Cedula: [null, Validators.required],
    Nombres: [null, Validators.required],
    Apellidos: [null, Validators.required],
    Telefono: [null, Validators.required],
    Correo: [null, Validators.required],
  });

  infoArrendatario: ArrendatariosModels = {

    CedulaArrendatario :  0,
    NombreArrendatario : "",
    ApellidoArrendatario : "",
    TelefonoArrendatario : 0,
    CorreoArrendatario : ""
  }

  ngOnInit(): void{
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    
    if(this.modalService.accion.value == "Editar"){
      this.addressForm.controls.Cedula.setValue(
        this.modalService.arrendatario['cedulaArrendatario']
      );
      this.addressForm.controls.Nombres.setValue(
        this.modalService.arrendatario['nombreArrendatario']
      );
      this.addressForm.controls.Apellidos.setValue(
        this.modalService.arrendatario['apellidoArrendatario']
      );
      this.addressForm.controls.Telefono.setValue(
        this.modalService.arrendatario['telefonoArrendatario']
      );
      this.addressForm.controls.Correo.setValue(
        this.modalService.arrendatario['correoArrendatario']
      );
    }
  }

  onSubmit(){
    this.titulo=this.modalService.titulo
    this.accion=this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar"){
      if (this.addressForm.valid) {
        this.infoArrendatario.CedulaArrendatario = this.addressForm.controls['Cedula'].value;
        this.infoArrendatario.NombreArrendatario = this.addressForm.controls['Nombres'].value;
        this.infoArrendatario.ApellidoArrendatario = this.addressForm.controls['Apellidos'].value;
        this.infoArrendatario.TelefonoArrendatario = this.addressForm.controls['Telefono'].value;
        this.infoArrendatario.CorreoArrendatario = this.addressForm.controls['Correo'].value;
  
        this.dialog.closeAll();
        this.apiService.post('Arrendatarios', this.infoArrendatario).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El arrendatario ha sido creado',
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
        this.infoArrendatario.CedulaArrendatario = this.addressForm.controls['Cedula'].value;
        this.infoArrendatario.NombreArrendatario = this.addressForm.controls['Nombres'].value;
        this.infoArrendatario.ApellidoArrendatario = this.addressForm.controls['Apellidos'].value;
        this.infoArrendatario.TelefonoArrendatario = this.addressForm.controls['Telefono'].value;
        this.infoArrendatario.CorreoArrendatario = this.addressForm.controls['Correo'].value;
  
        this.dialog.closeAll();
        this.apiService.update('Arrendatarios', this.infoArrendatario, String(this.modalService.arrendatario['cedulaArrendatario'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El arrendatario ha sido editado',
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
