import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;
  homeVisible: boolean;
  adminVisible: boolean;
  constructor() { this.visible = false; }

  hide() { 
      this.visible = false; 
    }
  show() {
       this.visible = true; 
    }


     hideAdminNav() {
    this.adminVisible = false;
  }
  showAdminNav() {
    this.adminVisible = true;
  }


    hideHome() { 
      this.homeVisible = false; 
    }
      showHome() {
       this.homeVisible = true; 
    }
      toggleHome() {
       this.homeVisible = !this.visible; 
    }
}