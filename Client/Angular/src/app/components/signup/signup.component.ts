import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm!: FormGroup;
  users!: UserModel[];
  sub!: Subscription;

  constructor(
    private router: Router, 
    private userService: UserHttpService,
    private auth: AuthService
    ) { }

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
    });

    this.sub = this.userService.findAll().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: err => console.log(err)
    });
  }

  get email() { return this.signupForm.get('email')};
  get password() { return this.signupForm.get('password')};
  get rules() { return this.signupForm.get('rules')};

  //TODO custom validator -> email in use
  onSubmit(){
    const userLog = this.signupForm.value;
    console.log(userLog);
    if(this.users.map(user => user.email).includes(userLog.email)){
      alert('This email has been already registered');
      this.signupForm.reset();
    } else {
      this.userService.create(userLog).subscribe({
        next: (user) => {
          console.log(user);
          this.router.navigate([''])
        }
      });
    }
    
  }

}
