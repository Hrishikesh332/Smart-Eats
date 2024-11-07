import { Component } from '@angular/core';
import { ApiService } from '../../shared/services/api.service';
import { CommonModule } from '@angular/common';
import { Database, get, ref } from '@angular/fire/database';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-x',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-x.component.html',
  styleUrl: './create-x.component.css'
})
export class CreateXComponent {

  showFirstDiv: boolean = true;
  user: any
  userChallenges: any
  isActive: any

  constructor(
    public db: Database,
    private apiService: ApiService,
    private toastService: ToastAlertService,
    private spinner: NgxSpinnerService,
    public router: Router,
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    this.showFirstDiv = Math.random() >= 0.5;
  }

  async ngOnInit() {
    if (this.user?.uid) {
      const challengesSnapshot = await get(ref(this.db, `/users/${this.user?.uid}/challenges`));
      this.userChallenges = challengesSnapshot.val();
      let activeChallenges = 0;
      if (this.userChallenges) {
        for (const key in this.userChallenges) {
          if (this.userChallenges[key].isActive) {
            activeChallenges++;
          }
        }
      }
      this.isActive = activeChallenges;
    }
  }

  async createChallange(challangeName: string, challangeDay: string, preference: string, targetBody: string, allergies:string, diabetes:string) {
    this.spinner.show();

    if (!this.user || !this.user.uid) {
      this.spinner.hide();
      this.router.navigate(['/login']);
      return;
    }

    if(this.isActive>=10){
      this.toastService.showToast('You can only have 2 active challenges at a time', 'error', 'top-end', 5000);
      this.spinner.hide();
      return;
    }

    const payload = {
      title: challangeName,
      day: challangeDay,
      user_id: this.user.uid,
      preference: preference,
      displayName: this.user.displayName,
      photoURL: this.user.photoURL,
      targetBody: targetBody,
      allergies:allergies,
      diabetes:diabetes
    }

    try {
      const response = await this.apiService.createChallenge(payload).toPromise();
      if (response) {
        this.toastService.showToast('Challenge created successfully', 'success', 'top-end');
      }
    } catch (error) {
      console.error('Error fetching data', error);
      this.toastService.showToast('Error creating challenge', 'error', 'top-end');
    } finally {
      this.apiService.refreshData.next(true);
      this.spinner.hide();
    }
  }

}
