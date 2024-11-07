import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FirebaseService } from '../../shared/services/firebase.service';
import { RouterLink } from '@angular/router';
import { Database, get, push, set, ref, update } from '@angular/fire/database';
import { FileUploadService } from '../../shared/services/file-upload.service';
import { FormsModule } from '@angular/forms';
import { ToastAlertService } from '../../shared/services/toast-alert.service';
import { ApiService } from '../../shared/services/api.service';
import Compressor from 'compressorjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { ProfileCardComponent } from '../profile-card/profile-card.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProfileCardComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  mealDesc: string = '';
  selectedFile: File | null = null;
  meals: any
  
  breakfast: any;
  lunch: any;
  dinner: any;

  currentMeal: any = {};
  currentTime: any;
  currentChallange: any;
  currentDay: any;
  bannerImg: any
  userId: any

  user: any

  constructor(
    public fauth: FirebaseService,
    public db: Database,
    public fileUpload: FileUploadService,
    private toastService: ToastAlertService,
    private apiService: ApiService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    if (typeof localStorage !== 'undefined' && localStorage.getItem('user')) {
      this.user = localStorage.getItem('user');
      this.user = JSON.parse(this.user);
      this.userId = localStorage.getItem('currentId');
      this.currentChallange = localStorage.getItem('currentChallange');
      this.userId = JSON.parse(this.userId);
      this.currentChallange = JSON.parse(this.currentChallange);
    }
    this.currentTime = this.dateTime();
  }

  async ngOnInit() {
    if (this.userId && this.currentChallange) {
      this.getChallaengeData();
    }
    this.getImgUrl()
    this.spinner.hide();
  }

  dateTime() {
    const data = Date.now();
    this.currentTime = data;
    // console.log('Current Time (timestamp):', this.currentTime);
    const date = new Date(data);
    const formattedDate = [
      date.getFullYear(),
      String(date.getMonth() + 1).padStart(2, '0'),
      String(date.getDate()).padStart(2, '0')
    ].join('-') + ' ' + [
      String(date.getHours()).padStart(2, '0'),
      String(date.getMinutes()).padStart(2, '0'),
      String(date.getSeconds()).padStart(2, '0')
    ].join(':');
    // console.log('Formatted Date:', formattedDate);
    return formattedDate;
  }

  async getChallaengeData() {
    this.getImgUrl()
    // console.log("get challaenge current > users/", this.userId, "/challenges/", this.currentChallange);
    const dataRef = ref(this.db, `users/${this.userId}/challenges/${this.currentChallange}`);
    await get(dataRef).then((snapshot) => {
      if (snapshot.exists()) {
        // console.log(" getChallaengeData Data available", snapshot.val());
        this.meals = this.prepareMealStatus(snapshot.val().meals);
        // append
        this.currentMeal = snapshot.val();
        // this.currentDay = "Day1";
        // check if currentDay is something else than Day1
        this.currentDay = this.currentDay ? this.currentDay : "Day1";
        this.breakfast = this.meals[this.currentDay].breakfast;
        this.lunch = this.meals[this.currentDay].lunch;
        this.dinner = this.meals[this.currentDay].dinner;
        this.toastService.showToast(this.currentDay+' Open', 'success', 'top-end');
      } else {
        console.log(" getChallaengeData No data available");
      }
    }).catch((error) => {
      console.error("getChallaengeData Error getting data", error);
    })
  }

  isTimeInRange(currentTime: string, startTime: string, endTime: string): boolean {
    const current = new Date(`1970-01-01T${currentTime}Z`).getTime();
    const start = new Date(`1970-01-01T${startTime}Z`).getTime();
    const end = new Date(`1970-01-01T${endTime}Z`).getTime();
    return current >= start && current <= end;
  }

  prepareMealStatus(mealsData: any): any {
    const day = this.currentDay;
    const currentDateTime = new Date(this.currentMeal.createdAt);
    const currentTime = new Date().getTime();

    const dayMeals = mealsData[day];

    for (let meal in dayMeals) {
      const mealStatus = dayMeals[meal].status;

      if (mealStatus === 'Done') {
        dayMeals[meal].status = 'Done';
      } else {
        const startTime = new Date(currentDateTime.setHours(8, 0, 0)).getTime(); // 8:00 AM
        const endTime = new Date(currentDateTime.setHours(10, 0, 0)).getTime();   // 10:00 AM

        if (currentTime >= startTime && currentTime <= endTime) {
          dayMeals[meal].status = 'Available';
        } else if (currentTime > endTime) {
          dayMeals[meal].status = 'Expired';
        } else {
          dayMeals[meal].status = 'Pending';
        }
      }
    }
    return mealsData;
  }

  counter(i: any): any {
    if (i) {
      return new Array(parseInt(i));
    }
    return [];
  }

  open(day: any) {
    // console.log("Day ==", day);
    // console.log("this.meals[day] ==", this.currentMeal);
    this.currentDay = day;
    // this.meals[day];
    this.breakfast = this.meals[day].breakfast;
    this.lunch = this.meals[day].lunch;
    this.dinner = this.meals[day].dinner;
    this.toastService.showToast(day+' Open', 'success', 'top-end');
  }

  async getImgUrl() {
    this.bannerImg = await this.fileUpload.imgURLs(this.userId, this.currentChallange);
  }

  async saveImage(input: HTMLInputElement, cat: string, meal: string) {
    this.spinner.show();
    if (!input.files){
      this.spinner.hide();
      return;
    }
    const files: FileList = input.files;
    const statuseOfImg = await this.onSubmit(files, meal)
    console.log(statuseOfImg)
    if (statuseOfImg && statuseOfImg.status === true) { 
    try {
      // Convert FileList to array
      const fileArray = Array.from(files);
      // Compress files
      const compressedFiles = await Promise.all(fileArray.map(file => this.compressImage(file)));
      // Convert array back to FileList
      const fileList = this.toFileList(compressedFiles);
      const imgUrls = await this.fileUpload.imgUpload(fileList, this.userId, this.currentChallange, meal);
      // console.log("imgUrls ??", imgUrls);
      // console.log("imgUrls[0] ??", imgUrls[0]);
      const userId = this.user.uid;
      const challengeId = this.currentChallange;
      // const day = this.meals.day;
      const mealType = cat;
      // path /users/fR6pl4fa72R2KS2Br7iDN7xbPAN2/challenges/-O3HehQSvMCZbyPlnYRr/meals/Day1/breakfast/img
      if (imgUrls) {
        const imgRef = ref(this.db, `users/${userId}/challenges/${challengeId}/meals/${this.currentDay}/${mealType}/img`);
        set(imgRef, imgUrls[0]);
        const statusRef = ref(this.db, `users/${userId}/challenges/${challengeId}/meals/${this.currentDay}/${mealType}/status`);
        set(statusRef, "Done");
        const scoreRef = ref(this.db, `users/${userId}/challenges/${challengeId}/meals/${this.currentDay}/${mealType}/score`);
        set(scoreRef, statuseOfImg.points);
        // set score to user info
        const infoScoreRef = ref(this.db, `users/${userId}/info/score`);
        const infoScoreSnapshot = await get(infoScoreRef);
        const currentScore = infoScoreSnapshot.exists() ? infoScoreSnapshot.val() : 0;
        const newScore = currentScore + statuseOfImg.points;
        await set(infoScoreRef, newScore);
        // update user
        this.getChallaengeData();
        this.spinner.hide()
        this.toastService.showToast('Image uploaded successfully', 'success', 'top-end');
      }
    } catch (error) {
      this.spinner.hide()
      this.toastService.showToast('Error uploading image', 'error', 'top-end');
      console.error('saveImage Error saving image URLs', error);
    }
    }
    else {
      this.spinner.hide()
      this.toastService.showToast('Image is not correct', 'error', 'top-end');
    }
  }

  private compressImage(file: File): Promise<File> {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.4, // Adjust quality (0 to 1)
        success: (compressedBlob: Blob) => {
          // Convert Blob to File
          const compressedFile = new File([compressedBlob], file.name, { type: compressedBlob.type });
          resolve(compressedFile);
        },
        error: (error) => reject(error),
      });
    });
  }
  
  // Convert an array of File objects to a FileList
  private toFileList(files: File[]): FileList {
    const dataTransfer = new DataTransfer();
    files.forEach(file => dataTransfer.items.add(file));
    return dataTransfer.files;
  }

  
async onSubmit(img: any, meal: string) {
  if (!img) {
    console.error('No file selected');
    return;
  }

  const formData = new FormData();
  formData.append('image', img[0]);
  formData.append('detail', meal);

  try {
    const response = await this.apiService.submitMeal(formData).toPromise();

    if (response?.status === true) {
      this.toastService.showToast('Meal check successful', 'success', 'top-end');
      return response; // Return the response if the image is valid
    } else {
      this.toastService.showToast('Meal check failed: Image is not correct', 'error', 'top-end');
      return response; // Return the response even if it's false
    }
  } catch (error) {
    console.error('Error submitting meal', error);
    this.toastService.showToast('Error submitting meal', 'error', 'top-end');
    return null;
  }
}


async getNutrients(mealDesc:string,mealType:string){
  this.spinner.show()
  try {
    const response = await this.apiService.checkNutrients(mealDesc).toPromise()
    console.log(response)
    if (response) {
      const nutrientsRef = ref(this.db, `users/${this.userId}/challenges/${this.currentChallange}/meals/${this.currentDay}/${mealType}/nutrients`);
      set(nutrientsRef, response);
      this.getChallaengeData()
      this.spinner.hide()
      this.toastService.showToast('Meal Nutrients generated successfully', 'success', 'top-end');
      return response;
    } else {
      this.spinner.hide()
      this.toastService.showToast('Meal Nutrients generation failed', 'error', 'top-end');
      return response;
    }
  } catch (error) {
    this.spinner.hide()
    console.error('Error submitting nutrients', error);
    this.toastService.showToast('Error submitting nutrients', 'error', 'top-end');
    return null;
  }
}


zomato(location:string,food:string){
  const city = location
  const encodedCity = encodeURIComponent(city);
  const encodedQuery = encodeURIComponent(food);
  const zomatoUrl = `https://www.zomato.com/${encodedCity}/search?q=${encodedQuery}`;
  window.open(zomatoUrl, '_blank');
}

swiggy(location:string,food:string){
  const city = location
  const encodedCity = encodeURIComponent(city);
  const encodedQuery = encodeURIComponent(food);
  const swiggyUrl = `https://www.swiggy.com/search?q=${encodedQuery}`;
  window.open(swiggyUrl, '_blank');
}

}

