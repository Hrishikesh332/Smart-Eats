import { Component } from '@angular/core';
import { Database, get, ref } from '@angular/fire/database';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CardXComponent } from "../card-x/card-x.component";
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { CreateXComponent } from '../create-x/create-x.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    RouterLink, 
    NgxPaginationModule, 
    CardXComponent,
    ProfileCardComponent,
    CreateXComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;
  topic: any;
  challengeData:any = {}

  constructor(
    public db: Database,
    private route: ActivatedRoute, 
    private router: Router
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  async ngOnInit() {

    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const currentRoute = event.urlAfterRedirects;
    })

    const getRef = ref(this.db, `website/banner/val`);
    await get(getRef).then((snapshot) => {
      if (snapshot.exists()) {
        this.topic = snapshot.val();
        this.topic = this.topic.split(' ');
      } else {
        console.log('No Topic available');
      }
    }).catch((error) => {
      console.error('ngOnInit Error fetching data: ', error);
    });
  }

}
