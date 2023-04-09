import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl([
        Validators.required,
        Validators.email
      ]),
      password: new FormControl([
        Validators.required,
      ]),
    })
  }

  onSubmit(){
    const userLog = this.loginForm.value;
    // this.authService.login(userLog).subscribe({
    //   next: (user) => {
    //     console.log(user);
    //     this.router.navigate(['people'])
    //   }
    // })
  }

}
