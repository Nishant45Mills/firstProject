import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  getValue: any;
  email: any;

  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activateRoute.queryParams.subscribe((data) => {

      this.email = data['email'];

    })
  }

  movePointer(p: any, c: any, n: any, e: any) {

    if (e.key == 'Backspace') {

      p.setFocus();
      p.value = ''

    }

    else {

      if (c.value.length > 1) {

        c.value = c.value[0];

      }

      if (n != '') {

        n.setFocus();

      }

      else {

        console.log("submit form successfully");

      }

    }
  }

}