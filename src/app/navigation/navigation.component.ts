import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

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
