import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private servis : UsersService, private router : Router) { }

  ngOnInit(): void {
  
  }

  registerA() {
    sessionStorage.setItem('mod','0');
    this.router.navigate(['registerA']);
  }
  registerK() {
    sessionStorage.setItem('mod','0');
    this.router.navigate(['registerK']);
  }
  noregister() {
    sessionStorage.setItem('mode',"neulogovan")
    this.router.navigate(['noregister']);
  }
  

  username : String;
  password : String;
  tip : Number;
  message : String;

  login() {
    this.servis.login(this.username,this.password,this.tip).subscribe((userFromDB : User)=>{
        if(userFromDB!= null) {
          const ime = userFromDB.username as string;
          sessionStorage.setItem("username",ime)
          if(userFromDB.registrovan == 1) {
            if(this.tip == 1)
              this.router.navigate(['klijent']);
            else
              this.router.navigate(['agencija']);
          }
          else {
            this.message = "Администратор још није одобрио регистрацију."
          }
        } else {
          this.message = "Непостојећи корисник или погрешна лозинка";
        }
    });
  }

}
