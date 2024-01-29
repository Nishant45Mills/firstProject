import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable, map } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  getValue: any;
  email: any;
  otpData:any = '';
  buttonStatus = true;

  constructor(private activateRoute: ActivatedRoute,private http:HttpService) { }

  ngOnInit() {

    this.activateRoute.queryParams.subscribe((data) => {

      this.email = data['email'];

    })
  }

  verifyOtp() {

    const user = {

      email:this.email,
      otp:this.otpData
    }

    console.log(user);
    

    this.http.post('/auth/verifyOtp',user).subscribe((data)=>{

      console.log(data);
      
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

}