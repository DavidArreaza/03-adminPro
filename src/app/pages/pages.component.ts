import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../services/settings.service';

declare function customInitFunctions():void;

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(private settingServices : SettingsService) { }

  ngOnInit(): void {
    customInitFunctions(); //Creada en custom.js para que se inicie cada vez que se inicie sesión y no se raye
  }

}
