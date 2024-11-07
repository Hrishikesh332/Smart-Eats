import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private myFunctionSubject = new Subject<void>();

  // Observable for the function
  myFunction$ = this.myFunctionSubject.asObservable();

  // Method to trigger the function
  triggerFunction() {
    this.myFunctionSubject.next();
  }
  refreshData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  navrefresh: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private baseUrl = '';

  constructor(private http: HttpClient) {
    // Check if the environment is production
    if(typeof window !== 'undefined') {
    if (window.location.hostname === 'localhost') {
      // Use the local API proxy in development
      this.baseUrl = '/api';
    } else {
      // Use the full API endpoint in production
      this.baseUrl = environment.apiBaseUrl;
    }
  }
  }

  createChallenge(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.baseUrl}/generate`, payload, { headers });
  }

  submitMeal(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, formData);
  }

  checkNutrients(meal_description:string){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = { meal_description }; // Wrap the string into an object

    return this.http.post(`${this.baseUrl}/get-nutrition`, body, { headers });
  }

}
