import { Component, OnInit } from '@angular/core';
import { Module } from '../../models/admin/module.model';
import { SessionService } from '../../services/common/session.service';

@Component({
  selector: 'app-ecommerce-admin-layout',
  templateUrl: './ecommerce-admin-layout.component.html',
  styleUrls: ['./ecommerce-admin-layout.component.css']
})
export class EcommerceAdminLayoutComponent implements OnInit {

  modules:Module[]=[];
  constructor(private _sessionService:SessionService) { }

  ngOnInit() {
    this.modules=this._sessionService.Modules;
  }

}
