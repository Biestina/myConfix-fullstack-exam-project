import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UserHttpService } from 'src/app/services/http/user-http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  users!: UserModel[];
  sub!: Subscription;
  emailNotFound: boolean = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private userService: UserHttpService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        this.emailNotFoundValidator(),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
    });

    this.sub = this.userService.findAll().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => console.log(err),
    });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    const userLog = this.loginForm.value;
    if (!this.users.map((user) => user.email).includes(userLog.email)) {
      alert('Account with this email not found');
      this.loginForm.reset();
    } else {
      this.auth.login(userLog).subscribe({
        next: (user) => {
          this.router.navigate(['']);
        },
      });
    }
  }

  emailNotFoundValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const email = control.value;
      let isInDb = this.users?.map((user) => user.email).includes(email);
      if (!isInDb) {
        this.emailNotFound = true;
        return { emailNotFound: { value: control.value } };
      } else {
        this.emailNotFound = false;
        return null;
      }
    };
  }
}
