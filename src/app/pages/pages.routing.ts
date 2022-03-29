import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccoutSettingsComponent } from './accout-settings/accout-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';

const routes : Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        //Rutas hijas
        children: [ 
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } }, //Data para mandar información entre componentes
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promess' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
            {path: 'profile', component: ProfileComponent, data: { titulo: 'Profile'}}
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)] ,
    exports: [ RouterModule ]
})

export class PagesRoutingModule{};