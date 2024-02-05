import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit, OnDestroy {
  getValue: any;
  email: any;
  otpData: any = '';
  buttonStatus = true;
  message = '';

  constructor(private activateRoute: ActivatedRoute, private http: HttpService, private route: Router) { }

  ngOnInit() {

    this.activateRoute.queryParams.subscribe((data) => {

      if (data['email'] != '') {
        this.email = data['email'];
      }

      else {

        this.email = '+91' + data['phone'];

      }
    })
  }

  verifyOtp() {

    const user = {

      email: this.email,
      otp: this.otpData
    }

    console.log(this.otpData);


    this.http.post('/auth/verifyOtp', user).subscribe({
      next: (data: any) => {

        console.log(data);
        localStorage.setItem('token', data['accessToken']);
        this.route.navigate(['/home']);

      }, error: (err) => {

        console.log(err);
        this.message = "Invalid OTP"

      }
    })

  }

  movePointer(p: any, c: any, n: any, e: any) {

    if (e.key == 'Backspace') {

      p.setFocus();
      p.value = ''

    }

    else {

      this.otpData = this.otpData + c.value;

      if (c.value.length > 1) {

        c.value = c.value[0];

      }

      if (n != '') {

        n.setFocus();

      }

      else {

        this.buttonStatus = false;

      }

    }
  }

  ngOnDestroy(): void {
    localStorage.removeItem('formStatus');
  }

}