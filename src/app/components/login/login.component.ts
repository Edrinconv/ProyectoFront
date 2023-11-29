import { Component, inject,OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  constructor(public apiService: ApiService){}
  private fb = inject(FormBuilder);
  loginForm = this.fb.group({
    correo: [null, Validators.required],
    contrasenia: [null, Validators.required],
  });
  loginRes = {};
  infoLogin = {
    correoLogin: "",
    passwordLogin: "",
    usuariologin: "",
  };

  ngOnInit(): void {


    this.apiService.Get("Usuarios").then((res) => {    
      this.loginRes = res;  
    });
  }

  onSubmit(){
    if (this.loginForm.valid) {
      var encontrado;
      this.infoLogin.correoLogin = String(this.loginForm.controls['correo'].value).toLowerCase();
      this.infoLogin.passwordLogin = String(this.loginForm.controls['contrasenia'].value).toLowerCase();
      for (var i = 0; i < Object.keys(this.loginRes).length; i++) {
        var login = this.loginRes[i];
        if (login['correo'] ==  this.infoLogin.correoLogin && login['contrasenia'] ==  this.infoLogin.passwordLogin) {
          localStorage.setItem("login", JSON.stringify(login))
          this.infoLogin.usuariologin = `${login['usuario1']}`
          encontrado = true;
          break;
        } else {
          encontrado = false;
        }
      }
      if (encontrado == true) {

        Swal.fire({
          title: 'Usuario Encontrado',
          text: `Bienvenido usuario ${this.infoLogin.usuariologin}`,
          icon: 'success',
          color: '#716add',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/Arrendatarios';
          }
        })
      }
      if (encontrado == false) {
        Swal.fire(
          'usuario no encontrado',
          'Por favor ingrese todos los campos requeridos',
          'error'
        )
      }
    } else {
      Swal.fire(
        'Ingresar los datos',
        'Por favor ingrese todos los campos requeridos',
        'error'
      )
    }
  }

  
}
