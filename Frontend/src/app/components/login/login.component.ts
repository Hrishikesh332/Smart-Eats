import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterLink, FooterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    public fauth: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
    const user = this.fauth.userData
    if (!user) {
      this.router.navigate(['/feed']);
    }
  }

}
