import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  buttonStatus = true;
  registerForm: FormGroup = this.fb.group({

    email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    // phone: ['', [Validators.minLength(10)]],
  });
  password: string = '';
  showPassword: boolean = false;
  submitStatus = false;

  constructor(private fb: FormBuilder, private route: Router, private toastController: ToastController, private http: HttpService) { }

  // async presentToast(position: 'top' | 'middle' | 'bottom') {
  //     const toast = await this.toastController.create({
  //       message: 'Register successfully',
  //       duration: 1000,
  //       position: position,
  //       color: 'success',
  //       cssClass: 'toast-custom-class',
  //     });

  //     await toast.present();

  // }

  ngOnInit() {
  }

  showButton(event: any) {

    if (event.target.value != '') {

      this.buttonStatus = false;
    }

    else {

      this.buttonStatus = true;
    }

    this.submitStatus = false;


  }

  onPaste(e: any) {

    const clipboardData = e.clipboardData;
    const pastedData = clipboardData.getData('text');

    // Check if the pasted data contains only numbers
    if (/^\d+$/.test(pastedData)) {
      // Allow the default behavior
      return true;
    } else {
      // Prevent the default behavior if the pasted data is not only numbers
      e.preventDefault();
      return false;
    }

  }

  sendForm(data1: any) {

    this.submitStatus = true;

    if (this.registerForm.valid) {

      this.http.post('/auth/register', this.registerForm.value).subscribe((data) => {

        this.route.navigate([`/auth/otp`], { queryParams: data1.value });

      })

    }
  }

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }

}