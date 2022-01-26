import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RequestSignup } from 'src/app/resources/models/RequestSignup';
import { AlertService } from 'src/app/resources/services/alert.service';
import { SignupService } from 'src/app/resources/services/signup.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public requestSignup!: RequestSignup;

  constructor(
    private signupService: SignupService,
    private alertService: AlertService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.requestSignup = new RequestSignup()
  }

  public signup():void {
    this.signupService.signup(this.requestSignup).subscribe(data => {
      this.router.navigate([''])
    },
    httperror => {
      this.alertService.error(httperror.error.message)
    })
  }

  public navigateToLogin():void{
    this.router.navigate([''])
  }
}
