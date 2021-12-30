import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-accout-settings',
  templateUrl: './accout-settings.component.html',
  styleUrls: ['./accout-settings.component.scss']
})
export class AccoutSettingsComponent implements OnInit {

  constructor( private settingsService: SettingsService ) {  }

  ngOnInit(): void {
    this.settingsService.checkCurrentTheme();
  }

  /**
   * Cambiar el color de tema
   * @param theme 
   */
  changeTheme( theme : string){
    this.settingsService.changeTheme(theme);
  }

}
