import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PagosModels } from 'src/app/Models/PagosModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-pagos',
  templateUrl: './form-pagos.component.html',
  styleUrls: ['./form-pagos.component.css']
})
export class FormPagosComponent {

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
    RcPago: [null, Validators.required],
    FacturaPago: [null, Validators.required],
    Fecha: [null, Validators.required],
    AbonoAdministracion: [null, Validators.required],
    Fecha2: [null, Validators.required],
    InteresPago: [null, Validators.required],
    TasaInteres: [null, Validators.required]
  });

  infoPagos: PagosModels = {

    RcPagos: 0,
    FacturaPagos: 0,
    FechaPagos: "",
    AbonoAdministracionPagos: 0,
    FechaAbonoCanonPagos: "",
    InteresPagos: 0,
    TasaInteresPagos: 0

  }

  ngOnInit(): void{
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    
    if(this.modalService.accion.value == "Editar"){
      this.addressForm.controls.RcPago.setValue(
        this.modalService.pagos['reciboCaja']
      );
      this.addressForm.controls.FacturaPago.setValue(
        this.modalService.pagos['factura']
      );
      this.addressForm.controls.Fecha.setValue(
        this.modalService.pagos['fecha']
      );
      this.addressForm.controls.AbonoAdministracion.setValue(
        this.modalService.pagos['abonoAdministracionPagos']
      );
      this.addressForm.controls.Fecha2.setValue(
        this.modalService.pagos['fechaAbonoCanonPagos']
      );
      this.addressForm.controls.InteresPago.setValue(
        this.modalService.pagos['interesPagos']
      );
      this.addressForm.controls.TasaInteres.setValue(
        this.modalService.pagos['tasaInteresPagos']
      );
    }
  }

  onSubmit(){
    this.titulo=this.modalService.titulo
    this.accion=this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar"){
      if (this.addressForm.valid) {
        this.infoPagos.RcPagos = this.addressForm.controls['RcPago'].value;
        this.infoPagos.FacturaPagos = this.addressForm.controls['FacturaPago'].value;
        this.infoPagos.FechaPagos = this.addressForm.controls['Fecha'].value;
        this.infoPagos.AbonoAdministracionPagos = this.addressForm.controls['AbonoAdministracion'].value;
        this.infoPagos.FechaAbonoCanonPagos = this.addressForm.controls['Fecha2'].value;
        this.infoPagos.InteresPagos = this.addressForm.controls['InteresesPago'].value;
        this.infoPagos.TasaInteresPagos = this.addressForm.controls['TasaIntereses'].value;
  
        this.dialog.closeAll();
        this.apiService.post('Pagos', this.infoPagos).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El pago ha sido creado',
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
        this.infoPagos.RcPagos = this.addressForm.controls['RcPago'].value;
        this.infoPagos.FacturaPagos = this.addressForm.controls['FacturaPago'].value;
        this.infoPagos.FechaPagos = this.addressForm.controls['Fecha'].value;
        this.infoPagos.AbonoAdministracionPagos = this.addressForm.controls['AbonoAdministracion'].value;
        this.infoPagos.FechaAbonoCanonPagos = this.addressForm.controls['Fecha2'].value;
        this.infoPagos.InteresPagos = this.addressForm.controls['InteresesPago'].value;
        this.infoPagos.TasaInteresPagos = this.addressForm.controls['TasaIntereses'].value;
  
        this.dialog.closeAll();
        this.apiService.update('Pagos', this.infoPagos, String(this.modalService.pagos  ['reciboCaja'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El pago ha sido editado',
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
