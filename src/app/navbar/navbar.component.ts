import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  public currentRoute : any;
  constructor(private router : Router,
              public appState : AppStateService,
              public loadingService : LoadingService) {
  }

  goToHome() {
    this.currentRoute="home"
    this.router.navigateByUrl("/admin/home")


  }

  goToProducts() {
    this.currentRoute="products"
    this.router.navigateByUrl("/admin/products")

  }

  goToNewProducts() {
    this.currentRoute="newProducts"
    this.router.navigateByUrl("/admin/newProducts");

  }

}
