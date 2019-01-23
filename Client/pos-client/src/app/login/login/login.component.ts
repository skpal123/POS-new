import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { LoginService } from '../../services/common/login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  Username:string=null;
  Password:string=null;
  NewPassword:string="";
  IpAddress:string="";
  constructor( private _router:Router,private _loginService:LoginService) { }

  ngOnInit() {
  }
  login(){
    this._loginService.login(this.Username,this.Password,this.NewPassword,this.IpAddress).subscribe(response=>{
      var loggedData=response.json();
      console.log(JSON.stringify( response.json()))
      sessionStorage.setItem('loggedData',JSON.stringify( response.json()));
      this._router.navigate(['login/postlogin']);  
    },error=>{

    })
   
  }
  postlogin(){
    this._router.navigate(['login/mainlayout']);
  }
}
