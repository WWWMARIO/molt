import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {  APP_TITLE } from 'src/environments/environment';
import { LogInComponent } from '../log-in/log-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(private dialog: MatDialog) { }
  appTitle = APP_TITLE

  ngOnInit(): void {
  }


  onLogIn(){

    const dialogRef = this.dialog.open(LogInComponent);

    /* dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); */
  }

  onSignUp(){

    const dialogRef = this.dialog.open(SignUpComponent);
  }

}
