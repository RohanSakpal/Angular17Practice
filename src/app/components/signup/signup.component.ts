import { Component } from '@angular/core';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(private authService:AuthService) { }

  register(regForm:NgForm) {
    console.log(regForm.value);
    this.authService.registerUser(regForm.value.email,regForm.value.password);
  }
  reset(regForm:NgForm) {
    regForm.reset();
  }
}
