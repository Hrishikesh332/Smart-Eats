import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { FirebaseService } from '../../shared/services/firebase.service';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { Database, get, ref, update } from '@angular/fire/database';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileCardComponent } from '../profile-card/profile-card.component';
import { CreateXComponent } from '../create-x/create-x.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    FormsModule, 
    NgxPaginationModule, 
    ProfileCardComponent,
    CreateXComponent
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  user: any
  info: any = {
    displayName: "",
    photoURL: "",
    height: "",
    weight: "",
    age: "",
    location: "",
    bio: "",
    preference: ""
  }
  loadProfile: any
  profilePhoto: string = '';

  constructor(
    public fauth: FirebaseService,
    public db: Database,
    private router: Router,
    public fileUpload: FileUploadService,
    private toastService: ToastAlertService,
    private spinner: NgxSpinnerService
  ) {
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
    }
    if (typeof localStorage !== 'undefined' && localStorage.getItem('loadProfile')) {
      this.loadProfile = localStorage.getItem('loadProfile');
      this.loadProfile = JSON.parse(this.loadProfile);
    }
    if (typeof window !== 'undefined') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

 async ngOnInit() {
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.reloadLocalStorage();
    }
  });
    this.getProfileInfo(this.loadProfile)
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const urlPath = this.router.url;
        const pathArray = urlPath.split('/');
        // console.log('URL Path:', pathArray[pathArray.length-1]);
        if(encodeURIComponent(this.user.displayName) == pathArray[pathArray.length-1].toString()){
          this.loadProfile = this.user.uid;
          this.getProfileInfo(this.loadProfile)
        }
      }
    });
    this.spinner.hide()
  }

  reloadLocalStorage() {
    // console.log('reloading local storage');
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
      this.loadProfile = localStorage.getItem('loadProfile');
      this.loadProfile = JSON.parse(this.loadProfile);
    }
  }

  async getProfilePhoto(uid: any){
    try {
      const photoRef = ref(this.db, `users/${uid}/info/photoURL`);
      const photoSnapshot = await get(photoRef);
      if (photoSnapshot.exists()) {
        this.profilePhoto = photoSnapshot.val();
      } else {
        console.log("No photo data available");
      }
    } catch (error) {
      console.error("Error fetching photo data:", error);
    }
  }

  async getProfileInfo(uid: any) {
    try {
      const infoRef = ref(this.db, `users/${uid}/info`);
      const infoSnapshot = await get(infoRef);
      if (infoSnapshot.exists()) {
        this.info = infoSnapshot.val();
      } else {
        this.toastService.showToast('No User info data available', 'error');
        console.log("No info data available");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }
  

  async updateProfile() {
    try {
      // Check for missing values in profile info
      if (!this.info.height || !this.info.weight || !this.info.age || !this.info.location || !this.info.preference) {
        this.toastService.showToast('Some profile fields are missing. Please fill all fields.', 'error');
        return;
      }
  
      // Update user info
      const infoRef = ref(this.db, `users/${this.user?.uid}/info`);
      await update(infoRef, {
        displayName: this.info.displayName,
        photoURL: this.info.photoURL,
        height: this.info.height,
        weight: this.info.weight,
        age: this.info.age,
        location: this.info.location,
        bio: this.info.bio,
        preference: this.info.preference
      });
      this.toastService.showToast('Profile info updated successfully', 'success');
    } catch (error) {
      console.error('Error updating profile info:', error);
      this.toastService.showToast('Failed to update profile info', 'error');
    }
    this.getProfileInfo(this.user?.uid);
  }

  goToUserProfile(val: any) {
    localStorage.setItem('loadProfile', JSON.stringify(val.userId));
    this.router.navigate(['/profile', val.displayName]);
  }

  uploadProfilePhoto(profile:any){
    this.spinner.show()
    if (!profile.files) return;
    const files: FileList = profile.files;
    this.fileUpload.imgUpload(files, this.user.uid, 'profile').then((res) => {
      // console.log('Profile photo uploaded successfully', res);
      this.toastService.showToast('Profile photo uploaded successfully', 'success');
      this.getProfileInfo(this.user.uid);
      this.spinner.hide()
    }).catch((error) => {
      console.error('Upload failed', error);
      this.toastService.showToast('Profile photo upload failed', 'error');
      this.spinner.hide()
    });

  }

}
