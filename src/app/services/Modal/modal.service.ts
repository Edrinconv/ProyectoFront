import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ArrendatariosModels } from 'src/app/Models/ArrendatariosModels';
import { PropietariosModels } from 'src/app/Models/PropietariosModels';


@Injectable({
  providedIn: 'root'
})
export class ModalService {
  arrendatario: ArrendatariosModels;
  propietario: PropietariosModels;


  titulo = "";
  accion = new BehaviorSubject("");
  constructor(){}
}
