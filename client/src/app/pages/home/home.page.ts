import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  localStorageItems = ['formStatus', 'token'];

  constructor(private route: Router) { }

  ngOnInit() {
  }

  logOut() {

    this.localStorageItems.forEach((item) => {

      localStorage.removeItem(item);
    })

    this.route.navigate(['/auth/register']);

  }

}
