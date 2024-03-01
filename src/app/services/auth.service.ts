import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private uid?: string;
  constructor(private router: Router) {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.uid = user.uid;
        console.log('User login',user.email);
      } else {
        this.uid = undefined;
        console.log('user logout');
      }
    });
  }

  isAuthenticated() {
    return this.uid ? true : false;
  }

  getUid() {
    return this.uid;
  }

  registerUser(email: string, password: string) {

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Something Went Wrong!");
      });
  }

  loginUser(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        this.router.navigate(['/create']);
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        alert("Something Went Wrong!");
      });
  }

  logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
      alert("User Logout");
      this.router.navigate(['/login']);
    }).catch((error: any) => {
      console.log(error);
      alert("Something Went Wrong")

    });
  }
}
