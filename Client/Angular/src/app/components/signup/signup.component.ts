import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      rules: new FormControl(false, [
        Validators.requiredTrue
      ])
    })
  }

  get email() { return this.signupForm.get('email')};
  get password() { return this.signupForm.get('password')};
  get rules() { return this.signupForm.get('rules')};

  //TODO register
  onSubmit(){
    const userLog = this.signupForm.value;
    // this.auth.login(userLog).subscribe({
      // next: (user) => {
        // console.log(user);
        this.router.navigate([''])
      // }
    // })
  }

}
