import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FirebaseService } from '../../shared/services/firebase.service';
import { Database, get, limitToLast, query, ref, update } from '@angular/fire/database';
import { ApiService } from '../../shared/services/api.service';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-card-x',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxPaginationModule],
  templateUrl: './card-x.component.html',
  styleUrl: './card-x.component.css'
})
export class CardXComponent {

  @Input() cardData: any;

  user: any;
  pchallengesArray: any[] = [];
  p: number = 1;
  pageNumbers: number[] = [];
  dchallengeArray: any[] = [];
  currentPath: string = '';
  loadProfile: any;

  constructor(
    public fauth: FirebaseService,
    public db: Database,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastService: ToastAlertService,
    private spinner: NgxSpinnerService
  ){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('loadProfile')) {
      this.loadProfile = localStorage.getItem('loadProfile');
      this.loadProfile = JSON.parse(this.loadProfile);
    }
    this.scrollToTop();
  }

  async ngOnInit() {
    this.apiService.refreshData.subscribe(() => {
      this.retrieveSingleUsersData(this.loadProfile);
    });
    this.apiService.myFunction$.subscribe(() => {
      localStorage.removeItem('loadProfile');
      this.p = 1
      this.retrieveAllUsersData();
    });
    if(this.loadProfile){
      this.retrieveSingleUsersData(this.loadProfile);
    }
    else{
      this.retrieveAllUsersData()
    }
  }

  async retrieveAllUsersData() {
  this.dchallengeArray= [];
  this.pchallengesArray= [];
  try {
      const userRef = ref(this.db, `users/`);    
      const usersQuery = query(userRef, limitToLast(100),);
      const snapshot = await get(usersQuery);
      const publicData = snapshot.val();
  
      if (!publicData) {
        console.error('No data available');
        return;
      }
  
      // Iterate through each user
      Object.keys(publicData).forEach(userKey => {
        let userObj = publicData[userKey];
        let userId = userKey;

        // filter out deleted users challenges "deleted: true"
        if (userObj.deleted === true) {
          return;
        }
  
        // Ensure userObj and challenges exist
        if (userObj && userObj.challenges) {
          // Iterate through each challenge of the user and append userId and challengeId to each challenge object
          Object.keys(userObj.challenges).forEach(challengeKey => {
            let challengeObj = userObj.challenges[challengeKey];
            challengeObj['userId'] = userId;  // Add userId to the challenge
            challengeObj['challengeId'] = challengeKey;  // Add challengeId to the challenge
            this.pchallengesArray.push(challengeObj);  // Push the modified challenge object to the array
          });
        }
      });
  
      // Filter out deleted challenges
      this.dchallengeArray = this.pchallengesArray.filter((item: any) => item.deleted !== true);
  
      // Sort challenges by createdAt
      this.dchallengeArray.sort((a, b) => {
        return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      });
  
      // console.log("Base Challenges Load", this.dchallengeArray); // Log the array of challenge objects
  
      // Paginate results
      this.pageNumbers = Array(Math.ceil(this.dchallengeArray.length / 5)).fill(0).map((_, i) => i + 1);
  
    } catch (error) {
      console.error('Error retrieving user data', error);
    } finally {
      this.spinner.hide();
      // console.log("Base Challenges Load"); // Log the array of challenge objects
    }

  }


  challengeData:any = {};
  async retrieveSingleUsersData(uid: any) {
    this.dchallengeArray = [];
    try {
      const userRef = ref(this.db, `users/${uid}/challenges`);
      const challengesQuery = query(userRef, limitToLast(100));
      const snapshot = await get(challengesQuery);
  
      this.challengeData = snapshot.val();
      if (this.challengeData) {
        let challengesArray: any[] = [];
        
        // Iterate over challenges and process them
        Object.keys(this.challengeData).forEach(key => {
          let obj1 = this.challengeData[key];
          obj1['challengeId'] = key;
  
          // Create an array to store images
          let imgList: string[] = [];
  
          // Iterate over each day in the meals object and collect image URLs
          Object.keys(obj1.meals).forEach(day => {
            const dayMeals = obj1.meals[day];
            if (dayMeals.breakfast && dayMeals.breakfast.img) {
              imgList.push(dayMeals.breakfast.img);
            }
            if (dayMeals.lunch && dayMeals.lunch.img) {
              imgList.push(dayMeals.lunch.img);
            }
            if (dayMeals.dinner && dayMeals.dinner.img) {
              imgList.push(dayMeals.dinner.img);
            }
          });
  
          // Append the imgList array to the object
          obj1['imgList'] = imgList;
          challengesArray.push(obj1);
        });
  
        // Append userId to each object
        challengesArray.forEach((obj: any) => {
          obj['userId'] = uid;
        });
  
        // Remove deleted challenges from the array "deleted: true"
        challengesArray = challengesArray.filter((item: any) => item.deleted !== true);
  
        // Sort by createdAt
        challengesArray.sort((a, b) => {
          return (new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        });
  
        this.dchallengeArray = challengesArray; // Assign the array to challengeData
  
        // Pagination logic
        this.pageNumbers = Array(Math.ceil(this.dchallengeArray.length / 5)).fill(0).map((_, i) => i + 1);
      } else {
        console.error("No challenge data found for this user.");
      }
    } catch (error) {
      console.error('Error retrieving user challenges:', error);
    } finally {
      this.spinner.hide();
    }
  }
  

  async editChallenge(data: any) {
    const htmlContent = `<input id="title" class="swal2-input" value="${data.title}" placeholder="Challenge Title">`;
    const result = await this.toastService.showEditableFormDialog(
      'Edit Challenge',
      htmlContent,
      'Save',
      'Cancel',
      '#3085d6',
      '#d33'
    );
 
    if (result.isConfirmed) {
      const formData = result.value;
      const dataUpdate = ref(this.db, `users/${data.userId}/challenges/${data.challengeId}`);
      await update(dataUpdate, {
        title: formData.title,
        updatedAt: new Date().toISOString()
      });

      this.retrieveSingleUsersData(data.userId);
      this.toastService.showToast('Challenge updated successfully', 'success');
    }

    // const dataUpdate = ref(this.db, `users/${data.userId}/challenges/${data.challengeId}`);
    // await update(dataUpdate, {
    //   title: data.title,
    //   createdAt: data.createdAt,
    //   updated_at : new Date().toISOString()
    // })
    // this.retrieveSingleUsersData(data.userId);
    // this.toastService.showToast('Challenge updated successfully', 'success');
  }

  async deleteChallenge(data: any) {
    const key = data.challengeId;
    const name = '"' + data.title + '"'
    const result = await this.toastService.showConfirmationDialog(
      'Are you sure?',
      'Do you really want to delete this ' + name + ' challenge?',
      'Yes, delete it!',
      'No, keep it'
    )
    if (result.isConfirmed) {
      const userRef = ref(this.db, `users/${this.user.uid}/challenges/${key}`);
      update(userRef, {
        deleted: true,
        isActive : false
      });
      this.retrieveSingleUsersData(this.user.uid);
      this.toastService.showToast(name + ' deleted', 'success');

    } else if (result.isDismissed) {
      // Handle the cancellation action
      // this.toastService.showToast('Item not deleted', 'info');
    }
  }

  getImgUrl(val: any): string {
    const day = 'Day1';
    const url = val[day];
    if (url.breakfast.img) {
      return url.breakfast.img;
    }
    if (url.breakfast.img) {
      return url.lunch.img;
    }
    if (url.breakfast.img) {
      return url.breakfast.img;
    }
    return 'assets/images/nophoto.jpg';
  }

  goToUserProfile(val: any) {
    localStorage.setItem('loadProfile', JSON.stringify(val.userId));
    this.router.navigate(['/profile', val.displayName]);
    this.retrieveSingleUsersData(val.userId);
    // this.apiService.refreshData.next(true);
    // this.retrieveSingleUsersData(val.userId);
    this.p = 1;
  }

  openChallenge(val: any) {
    localStorage.setItem('currentChallange', JSON.stringify(val.challengeId));
    localStorage.setItem('currentId', JSON.stringify(val.userId));
    this.router.navigate(['/challange', val.title]);
  }
  
  goToPage(page: number): void {
    this.p = page;
    this.scrollToTop('RecentPost');
  }

  scrollToTop(e?: any) {
    if (typeof window !== 'undefined') {
      const element = document.getElementById(e);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }

}
