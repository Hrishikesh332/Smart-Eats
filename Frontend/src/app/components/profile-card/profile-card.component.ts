import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Database, get, ref } from '@angular/fire/database';
import { ToastAlertService } from '../../shared/services/toast-alert.service';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.css'
})
export class ProfileCardComponent {

  user: any;
  userSocial: any;
  userInfo: any;
  userChallenges: any;
  data: any;

  constructor(
    public fauth: FirebaseService,
    public db: Database,
    private router: Router,
    private toastService: ToastAlertService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
  }

  async ngOnInit() {
    if (this.user?.uid) {
        // Fetch user info and social data concurrently
        const [infoSnapshot, socialSnapshot, challangesSnapshot] = await Promise.all([
          get(ref(this.db, `/users/${this.user.uid}/info`)),
          get(ref(this.db, `/users/${this.user.uid}/social`)),
          get(ref(this.db, `/users/${this.user.uid}/challenges`))
        ]);

        this.userInfo = infoSnapshot.val();
        this.userSocial = socialSnapshot.val();
        this.userChallenges = challangesSnapshot.val();

        let totalChallenges = 0;
        let deletedChallenges = 0;
        let activeChallenges = 0;
        
        if (this.userChallenges) {
          totalChallenges = Object.keys(this.userChallenges).length;
          
          for (const key in this.userChallenges) {
            if (this.userChallenges[key].deleted) {
              deletedChallenges++;
            }
            
            if (this.userChallenges[key].isActive) {
              activeChallenges++;
            }
            
          }
        }
        
        this.data = {
          totalChallenges: totalChallenges - deletedChallenges,
          activeChallenges: activeChallenges
        };
        

        // Check if the profile is incomplete
        if (this.isProfileIncomplete()) {
          this.router.navigate(['profile', this.user.displayName]);
          this.toastService.showToast('Please complete your profile before creating a challenge', 'info', 'top-end');
        }
      // } catch (error) {
      //   console.error('Error fetching user data:', error);
      // }
    }
  }

  private isProfileIncomplete(): boolean {
    const requiredFields = ['location', 'height', 'weight', 'age', 'preference'];
    return requiredFields.some(field => !this.userInfo?.[field]);
  }

  // async ngOnInit() {
  //   const infoRef = ref(this.db, `/users/${this.user?.uid}/info`);
  //   await get(infoRef).then((snapshot) => {
  //     this.userInfo = snapshot.val();
  //     if (this.userInfo.displayName === "" || this.userInfo.bio === "" || this.userInfo.location === "" || this.userInfo.height === "" || this.userInfo.weight === "" || this.userInfo.age === "" || this.userInfo.preference === "") {
  //       this.router.navigate(['profile', this.user.displayName]);
  //       this.toastService.showToast('Please complete your profile then you can create a challenge', 'info', 'top-end');
  //     }
  //   })
  //   const infoSocial = ref(this.db, `/users/${this.user.uid}/social`);
  //   await get(infoSocial).then((snapshot) => {
  //     this.userSocial = snapshot.val();
  //   })
  // }

}
