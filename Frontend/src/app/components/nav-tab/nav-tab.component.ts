import { Component, inject, Renderer2, ViewChild } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink, Event } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ApiService } from '../../shared/services/api.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CardXComponent } from '../card-x/card-x.component';

@Component({
  selector: 'app-nav-tab',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-tab.component.html',
  styleUrl: './nav-tab.component.css'
})
export class NavTabComponent {
  activeRoute: string | undefined;
  user: any;
  isProfileActive: boolean = false;

  @ViewChild(CardXComponent) cardXComponent!: CardXComponent;

  constructor(
    public fauth: FirebaseService,
    private router: Router,
    private renderer: Renderer2,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    this.apiService.navrefresh.subscribe(() => {
      console.log('navrefresh');
      if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
        this.user = localStorage.getItem('user');
        this.user = JSON.parse(this.user);
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.reloadLocalStorage();
      }
    });
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.activeRoute = event.urlAfterRedirects;
        this.isProfileActive = this.activeRoute.startsWith('/profile/');
      });
  }

  reloadLocalStorage() {
    console.log('reloading local storage');
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  toggleNavbar() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar) {
      this.renderer.removeClass(navbar, 'show');
    }
  }

  navProfile() {
    localStorage.setItem('loadProfile', JSON.stringify(this.user?.uid));
    this.router.navigate(['/profile', this.user?.displayName]);
    this.apiService.refreshData.next(true);
  }

  navHome() {
    localStorage.removeItem('loadProfile');
    // console.log('navHome');
    this.router.navigate(['/feed']);
    this.apiService.triggerFunction();
  }

  navAbout() {
    this.router.navigate(['/about']);
    this.spinner.show();
  }

  navLeaderboard() {
    this.router.navigate(['/leader-board']);
    this.spinner.show();
  }

}
