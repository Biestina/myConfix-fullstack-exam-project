import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
    })
  }

  get email() { return this.loginForm.get('email')};
  get password() { return this.loginForm.get('password')};

  onSubmit(){
    const userLog = this.loginForm.value;
    this.auth.login(userLog).subscribe({
      next: (user) => {
        console.log(user);
        this.router.navigate([''])
      }
    })
  }

}
