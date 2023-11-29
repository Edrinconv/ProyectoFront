import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ArriendosModels } from 'src/app/Models/ArriendosModels';
import { ModalService } from 'src/app/services/Modal/modal.service';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-form-arriendos',
  templateUrl: './form-arriendos.component.html',
  styleUrls: ['./form-arriendos.component.css']
})
export class FormArriendosComponent {

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
    Contrato: [null, Validators.required],
    CedulaArrendatario: [null, Validators.required],
    FechaPago: [null, Validators.required],
    VrCanon: [null, Validators.required],
    ReciboCaja: [null, Validators.required],
    
    
  });

  infoArriendos : ArriendosModels = {

    IdContrato: 0,
    FechaInicioContrato: "",
    ValorCanonContrato: 0,
    ValorAdministracionContrato: 0,
    RcPagosContrato: 0,
    CedulaArrendatarioContrato: 0,
  }

  ngOnInit(): void{
    this.titulo = this.modalService.titulo;
    this.accion = this.modalService.accion.value;
    
    if(this.modalService.accion.value == "Editar"){
      this.addressForm.controls.Contrato.setValue(
        this.modalService.proyectos['numeroContrato']
      );
      this.addressForm.controls.CedulaArrendatario.setValue(
        this.modalService.proyectos['CedulaArrendatarioContrato']
      );
      this.addressForm.controls.FechaPago.setValue(
        this.modalService.proyectos['inicio']
      );
      this.addressForm.controls.VrCanon.setValue(
        this.modalService.proyectos['canon']
      );
      this.addressForm.controls.ReciboCaja.setValue(
        this.modalService.proyectos['RcPagosContrato']
      );
    }
  }

  onSubmit(){
    this.titulo=this.modalService.titulo
    this.accion=this.modalService.accion.value
    if (this.modalService.accion.value == "Guardar"){
      if (this.addressForm.valid) {
        this.infoArriendos.IdContrato = this.addressForm.controls['Contrato'].value;
        this.infoArriendos.CedulaArrendatarioContrato = this.addressForm.controls['CedulaArrendatario'].value;
        this.infoArriendos.FechaInicioContrato = this.addressForm.controls['FechaPago'].value;
        this.infoArriendos.ValorCanonContrato = this.addressForm.controls['VrCanon'].value;
        this.infoArriendos.RcPagosContrato = this.addressForm.controls['ReciboCaja'].value;
  
        this.dialog.closeAll();
        this.apiService.post('ContratoArriendos', this.infoArriendos).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Creacion Realizada',
              text: 'El Contrato ha sido creado',
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
        this.infoArriendos.IdContrato = this.addressForm.controls['Contrato'].value;
        this.infoArriendos.CedulaArrendatarioContrato = this.addressForm.controls['CedulaArrendatario'].value;
        this.infoArriendos.FechaInicioContrato = this.addressForm.controls['FechaPago'].value;
        this.infoArriendos.ValorCanonContrato = this.addressForm.controls['VrCanon'].value;
        this.infoArriendos.RcPagosContrato = this.addressForm.controls['ReciboCaja'].value;
  
        this.dialog.closeAll();
        this.apiService.update('ContratoArriendos', this.infoArriendos, String(this.modalService.arriendos['numeroContrato'])).then(res => {
          if (res == undefined) {
            Swal.fire({
              title: 'Edicion Realizada',
              text: 'El contrato ha sido editado',
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
