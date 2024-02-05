import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { HttpService } from 'src/app/services/http.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  buttonStatus = true;
  public recaptchaVerifier?: firebase.auth.RecaptchaVerifier;

  registerForm: FormGroup = this.fb.group({

    email: ['', [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    phone: ['', [Validators.minLength(10)]],
  });
  password: string = '';
  showPassword: boolean = false;
  submitStatus = false;

  constructor(private fb: FormBuilder, private route: Router, private toastController: ToastController, private http: HttpService, private authService: AuthService) { }

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

  ionViewDidEnter() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {
        console.log(response);
        console.log(this.recaptchaVerifier);
      },
      'expired-callback': () => { }
    });


  }

  ionViewDidLoad() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      size: 'invisible',
      callback: (response: any) => {
        console.log(response);
        console.log(this.recaptchaVerifier);
      },
      'expired-callback': () => { }
    });
  }

  signinWithPhoneNumber() {
    console.log('+91' + this.registerForm.controls['phone'].value);
    console.log(this.recaptchaVerifier);

    if (this.registerForm.controls['phone'].value != '') {

      this.authService.signInWithPhoneNumber(this.recaptchaVerifier, '+91' + this.registerForm.controls['phone'].value).then(
        success => {
          // this.OtpVerification();
          console.log(success);
          localStorage.setItem('verificationId',success['verificationId']);
          this.route.navigate(['/auth/otp'], { queryParams: this.registerForm.value });

        }
      );
    }
  }

  showButton(event: any) {

    if (event.target.value != '') {

      this.buttonStatus = false;
    }

    else {

      this.buttonStatus = true;
    }

    this.submitStatus = false;
    this.registerForm.controls['phone'].reset('');

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

    if (this.registerForm.controls['email'].value != '') {

      console.log("in correct path");
      

      this.http.post('/auth/register', this.registerForm.value).subscribe((data) => {
        
        localStorage.setItem('formStatus','true');
        this.route.navigate([`/auth/otp`], { queryParams: data1.value });

      })

      console.log(this.registerForm.controls['email'].value);
    }

    else {
      console.log("in otp");

      this.signinWithPhoneNumber();
    }
  }

  togglePasswordVisibility() {

    this.showPassword = !this.showPassword;
  }

  enterNo(event: any) {

    this.registerForm.controls['email'].reset('');

    if (event.target.value != '') {

      this.buttonStatus = false;
    }

    else {

      this.buttonStatus = true;
    }

  }

}