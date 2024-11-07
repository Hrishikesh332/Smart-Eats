import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavTabComponent } from '../nav-tab/nav-tab.component';
import { FooterComponent } from '../footer/footer.component';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { CardXComponent } from '../card-x/card-x.component';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { CreateXComponent } from '../create-x/create-x.component';
import { FirebaseService } from '../../shared/services/firebase.service';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    RouterOutlet, 
    CommonModule, 
    NavTabComponent, 
    FooterComponent, 
    CardXComponent,
    ProfileCardComponent,
    CreateXComponent
    ],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css'
})
export class BaseComponent {

  user: any;
  loadProfile: any;
  showSection: boolean = true;

  constructor(
    public fauth: FirebaseService,
    private spinner: NgxSpinnerService,
    private router: Router, 
    private route: ActivatedRoute
  ){
    this.spinner.show();
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('loadProfile')) {
      this.loadProfile = localStorage.getItem('loadProfile');
      this.loadProfile = JSON.parse(this.loadProfile);
    }
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showSection = this.route.outlet !== null;
      }
    });
  }

  ngOnInit() { }

}
