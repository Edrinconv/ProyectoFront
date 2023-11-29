import { Component, inject } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { InmueblesModels } from 'src/app/Models/InmueblesModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-inmuebles',
  templateUrl: './form-inmuebles.component.html',
  styleUrls: ['./form-inmuebles.component.css']
})
export class FormInmueblesComponent {

  constructor(
    public apiService: ApiService,
    public dialog: MatDialog,
    public modalService: ModalService
  ) {

  }

  titulo = ""
  accion = ""

  private fb = inject(FormBuilder);
  addressForm = this.fb.group({
    MatInmueble: [null, Validators.required],
    ChipInmueble: [null, Validators.required],
    CedulaPropietario: [null, Validators.required],
    MatProyecto: [null, Validators.required],
    TipInmuebe: null,
    Nomenclatura: [null, Validators.required],
    NumEscritura: [null, Validators.required],
    AreaPrivada: [null, Validators.required],
    AreaConstruida: [null, Validators.required],
    Alcobas: [null, Validators.required],
    Banio: [null, Validators.required],
    Vehiculos: [null, Validators.required],
  });

  infoInmuebles: InmueblesModels = {

    MatriculaInmobiliariaInmueble: "",
    ChipInmueble: "",
    TipoInmueble: "",
    NomenclaturaInmueble: "",
    AreaPrivadaInmueble: 0,
    AreaConstruidaInmueble: 0,
    NumeroEscrituraInmueble: "",
    AlcobasInmueble: 0,
    BanosInmueble: 0,
    VehiculoInmueble: 0,
    IdLocativaInmueble: 0,
    CedulaPropietarioInmueble: 0,
    MatriculaInmobiliariaProyectoInmueble: 0,
  }

  ngOnInit(): void {
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;

    if (this.modalService.accion.value == "Editar") {
      this.addressForm.controls.MatInmueble.setValue(
        this.modalService.proyectos['MatriculaInmobiliariaInmueble']
      );
      this.addressForm.controls.ChipInmueble.setValue(
        this.modalService.proyectos['ChipInmueble']
      );
      this.addressForm.controls.CedulaPropietario.setValue(
        this.modalService.proyectos['CedulaPropietarioInmueble']
      );
      this.addressForm.controls.MatProyecto.setValue(
        this.modalService.proyectos['MatriculaInmobiliariaProyectoInmueble']
      );
      this.addressForm.controls.TipInmuebe.setValue(
        this.modalService.proyectos['TipoInmueble']
      );
      this.addressForm.controls.Nomenclatura.setValue(
        this.modalService.proyectos['NomenclaturaInmueble']
      );
      this.addressForm.controls.NumEscritura.setValue(
        this.modalService.proyectos['NumeroEscrituraInmueble']
      );
      this.addressForm.controls.AreaPrivada.setValue(
        this.modalService.proyectos['AreaPrivadaInmueble']
      );
      this.addressForm.controls.AreaConstruida.setValue(
        this.modalService.proyectos['AreaConstruidaInmueble']
      );
      this.addressForm.controls.Alcobas.setValue(
        this.modalService.proyectos['AlcobasInmueble']
      );
      this.addressForm.controls.Banio.setValue(
        this.modalService.proyectos['BanosInmueble']
      );
      this.addressForm.controls.Vehiculos.setValue(
        this.modalService.proyectos['VehiculoInmueble']
      );
    }
  }

  onSubmit() {
    this.titulo = this.modalService.titulo
    this.accion = this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar") {
      if (this.addressForm.valid) {
        this.infoInmuebles.MatriculaInmobiliariaInmueble = this.addressForm.controls['MatInmueble'].value;
        this.infoInmuebles.ChipInmueble = this.addressForm.controls['ChipInmueble'].value;
        this.infoInmuebles.CedulaPropietarioInmueble = this.addressForm.controls['CedulaPropietario'].value;
        this.infoInmuebles.MatriculaInmobiliariaProyectoInmueble = this.addressForm.controls['MatProyecto'].value;
        this.infoInmuebles.TipoInmueble = this.addressForm.controls['TipInmueble'].value;
        this.infoInmuebles.NomenclaturaInmueble = this.addressForm.controls['Nomenclatura'].value;
        this.infoInmuebles.NumeroEscrituraInmueble = this.addressForm.controls['NumEscritura'].value;
        this.infoInmuebles.AreaPrivadaInmueble = this.addressForm.controls['AreaPrivada'].value;
        this.infoInmuebles.AreaConstruidaInmueble = this.addressForm.controls['AreaConstruida'].value;
        this.infoInmuebles.AlcobasInmueble = this.addressForm.controls['Alcobas'].value;
        this.infoInmuebles.BanosInmueble = this.addressForm.controls['Banio'].value;
        this.infoInmuebles.VehiculoInmueble = this.addressForm.controls['Vehiculos'].value;

        this.dialog.closeAll();
        this.apiService.post('Inmuebles', this.infoInmuebles).then(res => {
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
    } else {

      if (this.addressForm.valid) {
        this.infoInmuebles.MatriculaInmobiliariaInmueble = this.addressForm.controls['MatInmueble'].value;
        this.infoInmuebles.ChipInmueble = this.addressForm.controls['ChipInmueble'].value;
        this.infoInmuebles.CedulaPropietarioInmueble = this.addressForm.controls['CedulaPropietario'].value;
        this.infoInmuebles.MatriculaInmobiliariaProyectoInmueble = this.addressForm.controls['MatProyecto'].value;
        this.infoInmuebles.TipoInmueble = this.addressForm.controls['TipInmueble'].value;
        this.infoInmuebles.NomenclaturaInmueble = this.addressForm.controls['Nomenclatura'].value;
        this.infoInmuebles.NumeroEscrituraInmueble = this.addressForm.controls['NumEscritura'].value;
        this.infoInmuebles.AreaPrivadaInmueble = this.addressForm.controls['AreaPrivada'].value;
        this.infoInmuebles.AreaConstruidaInmueble = this.addressForm.controls['AreaConstruida'].value;
        this.infoInmuebles.AlcobasInmueble = this.addressForm.controls['Alcobas'].value;
        this.infoInmuebles.BanosInmueble = this.addressForm.controls['Banio'].value;
        this.infoInmuebles.VehiculoInmueble = this.addressForm.controls['Vehiculos'].value;

        this.dialog.closeAll();
        this.apiService.update('Inmuebles', this.infoInmuebles, String(this.modalService.inmuebles['MatriculaInmobiliariaInmueble'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El inmueble ha sido editado',
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
