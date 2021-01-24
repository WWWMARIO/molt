import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  logInForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialogRef: MatDialogRef<LogInComponent>) { }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }

  onLogIn() {
    this.loading = true;
    this.loginService.logIn(this.logInForm.value).subscribe(resp => {
      this.dialogRef.close();
      this.router.navigate(['/menu']);

    }, err => {
      this.loading = false;
      this.snackBar.open('Invalid username or password', '', {
        duration: 3000
      });

    })

  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
