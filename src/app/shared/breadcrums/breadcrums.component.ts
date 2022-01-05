import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styleUrls: ['./breadcrums.component.scss']
})
export class BreadcrumsComponent implements OnInit, OnDestroy {

  title : string = '';
  public tituloSubs: Subscription;

  constructor(private router: Router) { 

    this.tituloSubs = this.getArgumentoRuta().subscribe((data: ActivationEnd) =>{
                        this.title = data.snapshot.data['titulo'];
                        document.title = `AdminPro - ${this.title}`
                      });      
    
  }
  ngOnDestroy(): void {
    this.tituloSubs.unsubscribe();
  }

  ngOnInit(): void {
  }

  /**
   * Busca en el routing el campo titulo que está en data
   */
  getArgumentoRuta(){
    
    return this.router.events
    .pipe( 
      filter((event : any) => {
        if ( event instanceof ActivationEnd && event.snapshot.firstChild === null && event.snapshot.data != null){
          return event.snapshot.data['titulo'];
        }
      })
    )

  }

}
