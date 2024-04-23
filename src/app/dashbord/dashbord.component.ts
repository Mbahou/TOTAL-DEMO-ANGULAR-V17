import {Component, OnInit} from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent implements OnInit{

  constructor(public appState : AppStateService) {
  }
  ngOnInit(): void {
  }

  totalCheckedProduct() {
    let checkedProduct = this.appState.ProductState.products.filter((p:any)=>p.checked==true);
    return checkedProduct.length;

  }
}
