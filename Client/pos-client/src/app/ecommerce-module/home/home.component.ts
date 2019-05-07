import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalItem:number=0;
  constructor(){}
  ngOnInit(){

  }
  clickPlusBtn(){
    this.totalItem++
  }
  clickMinusBtn(){
    this.totalItem--
  }
  on(){
    document.getElementById("overlay").style.display = "block";
  }
  off(){
    document.getElementById("overlay").style.display = "none";
  }
}
