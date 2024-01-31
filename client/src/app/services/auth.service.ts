import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  confirmationResult: firebase.auth.ConfirmationResult | undefined;

  constructor(private fireAuth: AngularFireAuth) { }

  public signInWithPhoneNumber(recaptchaVerifier:any, phoneNumber:any) {
    return new Promise<any>((resolve, reject) => {
      
      this.fireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier)
        .then((confirmationResult) => {
          
          this.confirmationResult = confirmationResult;
          resolve(confirmationResult);
        }).catch((error) => {
          console.log(error);
          reject('SMS not sent');
        });
    });
  }

}