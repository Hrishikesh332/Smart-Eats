import { Injectable } from '@angular/core';
import Swal,{ SweetAlertResult } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastAlertService {

  constructor() { }

  showToast(
    title: string,
    icon: 'success' | 'error' | 'warning' | 'info' | 'question' = 'success',
    position: 'top' | 'top-end' | 'top-start' | 'center' | 'center-end' | 'center-start' | 'bottom' | 'bottom-end' | 'bottom-start' = 'top-end',
    timer: number = 2500,
    backgroundColor?: string
  ) {
    Swal.fire({
      position,
      icon,
      title,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
      toast: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
      customClass: {
        popup: 'custom-toast'
      },
      background: backgroundColor || '#774fd6 !important',
      color: '#fff !important',
      
    });
  }

  showConfirmationDialog(
    title: string,
    text: string,
    confirmButtonText: string = 'Yes',
    cancelButtonText: string = 'No',
    icon?: 'warning' | 'question' | 'info' | 'error' | 'success',
    confirmButtonColor?: string,
    cancelButtonColor?: string
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      text,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
      confirmButtonColor,
      cancelButtonColor
    });
  }

  async showEditableFormDialog(
    title: string,
    htmlContent: string,
    confirmButtonText: string = 'Update',
    cancelButtonText: string = 'Cancel',
    confirmButtonColor: string = '#774fd6 !important',
    cancelButtonColor: string = '#d33',
    icon?: 'warning' | 'question' | 'info' | 'error' | 'success',
  ): Promise<SweetAlertResult<any>> {
    return Swal.fire({
      title,
      html: htmlContent,
      icon,
      showCancelButton: true,
      confirmButtonText,
      cancelButtonText,
      reverseButtons: true,
      focusConfirm: false,
      confirmButtonColor,
      cancelButtonColor,
      preConfirm: () => {
        const formData: any = {};
        const formElements = document.querySelectorAll('.swal2-input');
        formElements.forEach((element: any) => {
          formData[element.id] = element.value;
        });
        return formData;
      }
    });
  }

}
