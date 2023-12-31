import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PropietariosModels } from 'src/app/Models/PropietariosModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-propietarios',
  templateUrl: './form-propietarios.component.html',
  styleUrls: ['./form-propietarios.component.css']
})
export class FormPropietariosComponent {

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
    Cedula: [null, Validators.required],
    Nombres: [null, Validators.required],
    Apellidos: [null, Validators.required],
    Telefono: [null, Validators.required],
    Correo: [null, Validators.required],
    Banco: [null, Validators.required],
    NumeroDeCuenta: [null, Validators.required],
    TipoDeCuenta: ['AHORROS', Validators.required]
  });

  infoPropietarios: PropietariosModels = {

    CedulaPropietario: 0,
    NombrePropietario: "",
    ApellidoPropietario: "",
    TelefonoPropietario: 0,
    CorreoPropietario: "",
    CuentaBancariaPropietario: 0,
    TipoCuentaPropietario: "",
    NombreBancoPropietario: ""
  }

  ngOnInit(): void {

    this.accion = this.modalService.titulo;
    this.accion = this.modalService.accion.value;

    if (this.modalService.accion.value == "Editar") {
      this.addressForm.controls.Cedula.setValue(
        this.modalService.propietario['cedula']
      );
      this.addressForm.controls.Nombres.setValue(
        this.modalService.propietario['nombre']
      );
      this.addressForm.controls.Apellidos.setValue(
        this.modalService.propietario['apellido']
      );
      this.addressForm.controls.Telefono.setValue(
        this.modalService.propietario['telefono']
      );
      this.addressForm.controls.Correo.setValue(
        this.modalService.propietario['correo']
      );
      this.addressForm.controls.NumeroDeCuenta.setValue(
        this.modalService.propietario['cuenta']
      );
      this.addressForm.controls.TipoDeCuenta.setValue(
        this.modalService.propietario['tipo']
      );
      this.addressForm.controls.Banco.setValue(
        this.modalService.propietario['banco']
      );

    }
  }

  onSubmit(){
    this.titulo=this.modalService.titulo
    this.accion=this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar"){
      if (this.addressForm.valid) {
        this.infoPropietarios.CedulaPropietario = this.addressForm.controls['Cedula'].value;
        this.infoPropietarios.NombrePropietario = this.addressForm.controls['Nombres'].value;
        this.infoPropietarios.ApellidoPropietario = this.addressForm.controls['Apellidos'].value;
        this.infoPropietarios.TelefonoPropietario = this.addressForm.controls['Telefono'].value;
        this.infoPropietarios.CorreoPropietario = this.addressForm.controls['Correo'].value;
        this.infoPropietarios.NombreBancoPropietario = this.addressForm.controls['Banco'].value;
        this.infoPropietarios.CuentaBancariaPropietario = this.addressForm.controls['NumeroDeCuenta'].value;
        this.infoPropietarios.TipoCuentaPropietario = this.addressForm.controls['TipoDeCuenta'].value;

        this.dialog.closeAll();
        this.apiService.post('Propietarios', this.infoPropietarios).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El propietario ha sido creado',
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
        this.infoPropietarios.CedulaPropietario = this.addressForm.controls['Cedula'].value;
        this.infoPropietarios.NombrePropietario = this.addressForm.controls['Nombres'].value;
        this.infoPropietarios.ApellidoPropietario = this.addressForm.controls['Apellidos'].value;
        this.infoPropietarios.TelefonoPropietario = this.addressForm.controls['Telefono'].value;
        this.infoPropietarios.CorreoPropietario = this.addressForm.controls['Correo'].value;
        this.infoPropietarios.NombreBancoPropietario = this.addressForm.controls['Banco'].value;
        this.infoPropietarios.CuentaBancariaPropietario = this.addressForm.controls['NumeroDeCuenta'].value;
        this.infoPropietarios.TipoCuentaPropietario = this.addressForm.controls['TipoDeCuenta'].value;
  
        this.dialog.closeAll();
        this.apiService.update('Propietarios', this.infoPropietarios, String(this.modalService.propietario['cedula'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El propietario ha sido editado',
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
