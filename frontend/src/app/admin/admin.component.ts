import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router : Router, private servis : UsersService) { }

  ngOnInit(): void {
  } 

  username : String;
  password : String;
  message : String;

  login() {
    this.servis.loginAdmin(this.username,this.password).subscribe((userFromDB : Admin)=>{
        if(userFromDB!= null) {
          const ime = userFromDB.username as string;
          sessionStorage.setItem("username",ime)
          this.router.navigate(['adminUlogovan']);
        } else {
          this.message = "Непостојећи корисник или погрешна лозинка";
        }
    });
  }
  
}
