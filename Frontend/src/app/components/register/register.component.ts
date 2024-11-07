import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseService } from '../../shared/services/firebase.service';
import { FooterComponent } from "../footer/footer.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FooterComponent],
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  constructor(public fauth: FirebaseService) { }
}
