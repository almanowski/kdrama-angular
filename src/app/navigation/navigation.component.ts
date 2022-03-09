/**
 * This component displays the navbar
 * @module NavigationComponent
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public router: Router,) { }

  /**
   * Get username from local storage to display in navbar
   */
  get username(): any {
    return localStorage.getItem('Username');
  }

  
  /** 
   * Clears the local Storage and redirects to the welcome page
   * @function onLoggedOut
   * @module WelcomePageComponent
   */
  onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  }

  ngOnInit(): void {
  }

}
