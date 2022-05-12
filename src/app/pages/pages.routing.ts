import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';


const routes : Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ], //Así afecta a todas las rutas
        canLoad: [ AuthGuard ],
        //Rutas hijas con LazyLoad
        loadChildren : () => import('./child-routes.module').then( m => m.ChildRoutesModule )
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes)] ,
    exports: [ RouterModule ]
})

export class PagesRoutingModule{};