import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public router: Router,) { }

  get username(): any {
    return localStorage.getItem('Username');
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  ngOnInit(): void {
  }

}
