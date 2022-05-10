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

// Mantenimiento
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';


const routes : Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ], //Así afecta a todas las rutas
        //Rutas hijas
        children: [ 
            { path: '', component: DashboardComponent, data: { titulo: 'Dashboard' } }, //Data para mandar información entre componentes
            { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' } },
            { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica' } },
            { path: 'account-settings', component: AccoutSettingsComponent, data: { titulo: 'Ajustes' } },
            { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promess' } },
            { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
            { path: 'profile', component: ProfileComponent, data: { titulo: 'Profile' } },
            { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas' } },

            // Mantenimientos
            { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales' } },
            { path: 'medicos', component: MedicosComponent, data: { titulo: 'Medicos' } },
            { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Medicos' } },

            // Rutas Admin
            { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios' } }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)] ,
    exports: [ RouterModule ]
})

export class PagesRoutingModule{};