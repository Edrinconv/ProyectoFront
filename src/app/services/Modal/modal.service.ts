import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArrendatariosModels } from 'src/app/Models/ArrendatariosModels';
import { PagosModels } from 'src/app/Models/PagosModels';
import { PropietariosModels } from 'src/app/Models/PropietariosModels';
import { ProyectosModels } from 'src/app/Models/ProyectosModels';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  arrendatario: ArrendatariosModels;
  propietario: PropietariosModels;
  pagos: PagosModels;
  proyectos: ProyectosModels;
  


  titulo = "";
  accion = new BehaviorSubject("");
  constructor(){}
}
