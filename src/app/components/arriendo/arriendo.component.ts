import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormArriendosComponent } from '../Forms/form-arriendos/form-arriendos.component';
import { ModalService } from 'src/app/services/Modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arriendo',
  templateUrl: './arriendo.component.html',
  styleUrls: ['./arriendo.component.css']
})
export class ArriendoComponent implements OnInit {
  displayedColumns: string[] = ['numeroContrato', 'inicio', 'nombreArrendatario', 'apellidoArrendatario', 'canon', "admon",  'Acciones'];
  dataSource: MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public apiService: ApiService,
    public dialog: MatDialog,
    public ModalService: ModalService
    ) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void {

    this.apiService.Get("ContratoArriendos").then((res) => {      
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delRegistro(element: any){

    const id=element.IdContrato

    Swal.fire({
      title: 'Estás seguro de eliminarlo?',
      text: "Recuerda que no podras recuperar esta información!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if(element !== undefined){
          this.apiService.delete('ContratoArriendos', String(id)).then((res) =>{
            console.log(res)
            this.ngOnInit();
          if (res == undefined) {
              Swal.fire({
                title: 'Eliminación Realizada',
                text: 'El Contrato de Arriendo ha sido eliminado',
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
        }else {
          Swal.fire(
            'Ingresar los datos',
            'Por favor ingrese todos los campos requeridos',
            'error'
          )
        }
      }
    })
  }


  openDialog() {
    this.ModalService.accion.next("Guardar")
    this.ModalService.titulo = "Crear"
    this.dialog.open(FormArriendosComponent, {});
  }

  editarRegistro(element: any){
    this.ModalService.accion.next("Editar");
    this.ModalService.titulo = "Editar"
    this.ModalService.arriendos = element

    this.dialog.open(FormArriendosComponent, {})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}