import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<SignUpComponent>,
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],

    });
  }


  onSignUp() {
    this.loginService.signUp(this.signUpForm.value).subscribe(()=> {
      this.dialogRef.close();
      this.router.navigate(['/menu'])
    }, error => {
      this.snackBar.open(error.error, 'Close', {
        duration: 3000
      });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }




}
