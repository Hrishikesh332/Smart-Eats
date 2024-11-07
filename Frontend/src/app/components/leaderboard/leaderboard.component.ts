import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Database, get, ref, query, orderByChild } from '@angular/fire/database';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-leaderboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leaderboard.component.html',
  styleUrl: './leaderboard.component.css'
})
export class LeaderboardComponent {

  user: any
  userList: any

  constructor(public fauth: FirebaseService,
    public db: Database,
    private router: Router,
    private toastService: ToastAlertService,
    private spinner: NgxSpinnerService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }
  
  async ngOnInit() {
    const usersRef = ref(this.db, 'users');
    const infoQuery = query(usersRef, orderByChild('info/score'));
    
    try {
      const snapshot = await get(infoQuery);
      if (snapshot.exists()) {
        this.userList = Object.values(snapshot.val())
        .map((userData: any) => userData.info)
        .sort((a: any, b: any) => b.score - a.score);
        this.userList = this.userList.slice(0, 5)
        // console.log("Top 5 users:", this.userList);
      } else {
        console.log("No users found");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
    this.spinner.hide();
  }


  saveWork() {
    this.toastService.showToast('Your work has been saved', 'success', 'top-start', 1500, '#4FD675');
  }

  async confirmDelete() {
    const result = await this.toastService.showConfirmationDialog(
      'Are you sure?',
      'Do you really want to delete this item?',
      'Yes, delete it!',
      'No, keep it'
    );

    if (result.isConfirmed) {
      // Perform the deletion action
      this.toastService.showToast('Item deleted', 'success');
    } else if (result.isDismissed) {
      // Handle the cancellation action
      this.toastService.showToast('Item not deleted', 'info');
    }
  }
}
