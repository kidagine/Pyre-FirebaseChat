import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './shared/services/animation.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    fader,
  ]
})

export class AppComponent {
  title = 'Pyre';

  prepareRoute(outlet: RouterOutlet){
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
