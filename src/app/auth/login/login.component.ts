import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { AuthApiService } from 'src/app/api/auth.api.service'
import { AuthenticationService } from 'src/app/services/authentication.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  validateForm: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    })
  }

  submitForm(): void {
    // tslint:disable-next-line: forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty()
      this.validateForm.controls[i].updateValueAndValidity()
    }
    if (this.validateForm.invalid) {
      return
    }
    this.authService.login(this.validateForm.value).subscribe(() => { this.router.navigate(['']) })
  }
}
