import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { FormArreglosLocativosComponent } from '../Forms/form-arreglos-locativos/form-arreglos-locativos.component';
import { ModalService } from 'src/app/services/Modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-arreglos-locativos',
  templateUrl: './arreglos-locativos.component.html',
  styleUrls: ['./arreglos-locativos.component.css']
})
export class ArreglosLocativosComponent implements OnInit {
  displayedColumns: string[] = ['arreglo', 'fechaInicio', 'fechaFin', 'observacion', 'Acciones'];
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

    this.apiService.Get("ArregloLocativos").then((res) => {      
      this.dataSource.data = res
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  delRegistro(element: any){

    const id=element.arreglo

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
          this.apiService.delete('ArregloLocativos', String(id)).then((res) =>{
            console.log(res)
            this.ngOnInit();
          if (res == undefined) {
              Swal.fire({
                title: 'Eliminación Realizada',
                text: 'El arreglo ha sido eliminado',
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

    this.dialog.open(FormArreglosLocativosComponent, {});
  }

  editarRegistro(element: any){
    this.ModalService.accion.next("Editar");
    this.ModalService.titulo = "Editar"
    this.ModalService.arreglosLocativos = element

    this.dialog.open(FormArreglosLocativosComponent, {})
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}