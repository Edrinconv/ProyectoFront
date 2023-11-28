import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArreglosModels } from 'src/app/Models/ArreglosModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-arreglos-locativos',
  templateUrl: './form-arreglos-locativos.component.html',
  styleUrls: ['./form-arreglos-locativos.component.css']
})
export class FormArreglosLocativosComponent {

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
    IdArreglo: [null, Validators.required],
    Fecha1: [null, Validators.required],
    Fecha2: [null, Validators.required],
    EstadoArreglo: [null, Validators.required],
    Observaciones: [null, Validators.required],
  });

  infoArreglos: ArreglosModels = {

    IdLocativaArreglo: 0,
    FechaInicioArreglo: "",
    FechaFinalizacionArreglo: "",
    EstadoArreglo: "",
    ObservacionesArreglo: "",
  }

  ngOnInit(): void{
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    
    if(this.modalService.accion.value == "Editar"){
      this.addressForm.controls.IdArreglo.setValue(
        this.modalService.arreglosLocativos['idLocativaArreglo']
      );
      this.addressForm.controls.Fecha1.setValue(
        this.modalService.arreglosLocativos['fechaInicioArreglo']
      );
      this.addressForm.controls.Fecha2.setValue(
        this.modalService.arreglosLocativos['fechaFinalizacionArreglo']
      );
      this.addressForm.controls.EstadoArreglo.setValue(
        this.modalService.arreglosLocativos['estadoArreglo']
      );
      this.addressForm.controls.Observaciones.setValue(
        this.modalService.arreglosLocativos['observacionesArreglo']
      );
    }
  }

  onSubmit(){
    this.titulo=this.modalService.titulo
    this.accion=this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar"){
      if (this.addressForm.valid) {
        this.infoArreglos.IdLocativaArreglo = this.addressForm.controls['IdArreglo'].value;
        this.infoArreglos.FechaInicioArreglo = this.addressForm.controls['Fecha1'].value;
        this.infoArreglos.FechaFinalizacionArreglo = this.addressForm.controls['Fecha2'].value;
        this.infoArreglos.EstadoArreglo = this.addressForm.controls['EstadoArreglo'].value;
        this.infoArreglos.ObservacionesArreglo = this.addressForm.controls['Observaciones'].value;
  
        this.dialog.closeAll();
        this.apiService.post('ArregloLocativos', this.infoArreglos).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El arreglo ha sido creado',
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
        this.infoArreglos.IdLocativaArreglo = this.addressForm.controls['IdArreglo'].value;
        this.infoArreglos.FechaInicioArreglo = this.addressForm.controls['Fecha1'].value;
        this.infoArreglos.FechaFinalizacionArreglo = this.addressForm.controls['Fecha2'].value;
        this.infoArreglos.EstadoArreglo = this.addressForm.controls['EstadoArreglo'].value;
        this.infoArreglos.ObservacionesArreglo = this.addressForm.controls['Observaciones'].value;
  
        this.dialog.closeAll();
        this.apiService.update('ArregloLocativos', this.infoArreglos, String(this.modalService.arreglosLocativos['idLocativaArreglo'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El arreglo ha sido editado',
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
