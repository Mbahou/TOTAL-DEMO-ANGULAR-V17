import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProductServiceService} from "../services/product-service.service";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-new-products',
  templateUrl: './new-products.component.html',
  styleUrl: './new-products.component.css'
})
export class NewProductsComponent implements OnInit{
  public productForm! : FormGroup;

  constructor(private fb : FormBuilder , private productService : ProductServiceService) {
  }

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name : this.fb.control('',[Validators.required]),
      price : this.fb.control(0,[Validators.required]),
      checked : this.fb.control(false,[Validators.required]),

    });
  }

  saveProducts() {
    let product :Product = this.productForm.value;
    this.productService.saveProduct(product).subscribe({
      next: data => {
        alert(JSON.stringify(data));

      },error:err => {
        console.log(err);

      }
    })
  }
}
