import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductServiceService} from "../services/product-service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../model/product.model";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit{
  productId! : number;
  productFormFroup! : FormGroup;
  constructor(private activatedRoute : ActivatedRoute,
              private productService : ProductServiceService,
              private formBuilder : FormBuilder) {
  }
  ngOnInit(): void {
    this.productId=this.activatedRoute.snapshot.params['id'];
    this.productService.getProductById(this.productId).subscribe({
      next : (product)=>{
        this.productFormFroup=this.formBuilder.group({
          id : this.formBuilder.control(product.id),
          name : this.formBuilder.control(product.name,Validators.required),
          price :  this.formBuilder.control(product.price,Validators.required),
          checked: this.formBuilder.control(product.checked,Validators.required)
        })
      },
      error :err => {
        console.log(err);
      }
    });
  }

  updateProduct() {
    let product : Product =this.productFormFroup.value;
    this.productService.updateProduct(product).subscribe({
      next : (data)=>{
        alert(JSON.stringify(data));
      }
    })

  }
}
