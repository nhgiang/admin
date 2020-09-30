import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Activity } from 'src/utils/activity'
import { AuthenticationService } from '../services/authentication.service'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {
  isCollapsed = false
  activity = new Activity()
  constructor(
    private authenService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.activity.start('logout')
    setTimeout(() => {
      this.authenService.logout()
      this.router.navigate(['/auth'])
      this.activity.stop('logout')
    }, 300)
  }
}
