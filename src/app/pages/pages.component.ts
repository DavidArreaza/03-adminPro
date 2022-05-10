import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';
import { SidebarService } from '../services/sidebar.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private settingServices : SettingsService, private sidebarService : SidebarService) { }

  ngOnInit(): void {
    customInitFunctions(); //Creada en custom.js para que se inicie cada vez que se inicie sesión y no se raye
    this.sidebarService.cargarMenu();
  }

}
