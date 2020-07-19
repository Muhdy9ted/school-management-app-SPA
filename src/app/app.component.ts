import { Component } from '@angular/core';
import { AuthService } from './_shared/services/auth.service';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd, NavigationError, Event, NavigationCancel } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SchoolManagementApp-SPA';
  showSpinner = false;


  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showSpinner = true;
      } else if (routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationError
        || routerEvent instanceof NavigationCancel) {
        this.showSpinner = false;
      }
    });
  }
}
