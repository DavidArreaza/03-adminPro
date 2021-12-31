import { Component, OnInit } from '@angular/core';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menuItems: any[];

  constructor( private sidebarSetting : SidebarService ) { 
    this.menuItems = sidebarSetting.menu;
  }

  ngOnInit(): void {
  }

}
