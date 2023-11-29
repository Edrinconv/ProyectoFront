import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArreglosModels } from 'src/app/Models/ArreglosModels';
import { ArrendatariosModels } from 'src/app/Models/ArrendatariosModels';
import { ArriendosModels } from 'src/app/Models/ArriendosModels';
import { InmueblesModels } from 'src/app/Models/InmueblesModels';
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
  arriendos: ArriendosModels;
  inmuebles: InmueblesModels;
  arreglosLocativos: ArreglosModels;
  


  titulo = "";
  accion = new BehaviorSubject("");
  constructor(){}
}
