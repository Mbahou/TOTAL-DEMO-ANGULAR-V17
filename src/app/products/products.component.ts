import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from "../services/product-service.service";
import {Product} from "../model/product.model";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{


  constructor(private productService : ProductServiceService,
              private router : Router,
              public appstate : AppStateService) {
  }

  ngOnInit(): void {
    this.serchProducts();

  }

  deleteProduct(product: Product) {
/*    let index=this.products.indexOf(p);
    this.products.splice(index,1);*/
      this.productService.deleteProduct(product).subscribe({
          next:value => {
            this.serchProducts();
           // this.appstate.ProductState.products=this.appstate.ProductState.products.filter((p: { id: number; })=>p.id!=product.id);

          }
          }

      )

  }
  serchProducts(){
/*    this.appstate.setProductState({
      status : "LOADING"
    })*/
    this.productService.getProduct(this.appstate.ProductState.keyword,
      this.appstate.ProductState.currentPage,
      this.appstate.ProductState.pageSize).subscribe({
      next :  (resp) =>{
      let products=resp.body as Product[];

        let totalProducts : number = parseInt(resp.headers.get('X-Total-Count')!);
        this.appstate.ProductState.totalProduct=totalProducts;
        let totalpages= Math.floor(totalProducts / this.appstate.ProductState.pageSize); // 1 pages
        console.log(this.appstate.ProductState.totalPages)
        if (totalProducts % this.appstate.ProductState.pageSize !=0){
          //this.appstate.ProductState.totalPages =this.appstate.ProductState.totalPages + 1;
          ++totalpages;
        }
        this.appstate.setProductState({
          products : products,
          totalProducts : totalProducts,
          totalPages : totalpages,
          status :"LOADED"

        })
      },
      error :err => {
        this.appstate.setProductState({
          status :"ERROR",
          errorMessage : err
        })
      }
    });
  }

/*  search() {
    this.currentPage=1;
    this.totalPages=0;
     this.productService.searchProduct(this.keyword,this.currentPage,this.pageSize).subscribe({
       next : data =>{
         console.log(data);
         this.products=data;
       }
     })*/
/*    console.log(this.keyword);
    let result=[];
    for (let p of this.products){
      if (p.name.includes(this.keyword)){
        result.push(p);
      }

    }
    this.products=result;*/

  //}

  handleCheckProduct(p: Product) {
    this.productService.checkProduct(p).subscribe({
      next : updatedProduct=>{
        p.checked=!p.checked;
      //  this.getProducts();
/*        this.products.map(p=>{
          if (p.id==product.id){
            return updatedProduct;
          }else return p;
        });*/

    }
    })

  }

  handleGoToPage(page: number) {
    this.appstate.ProductState.currentPage=page;
    this.serchProducts();

  }

  handleEdit(p: Product) {
    this.router.navigateByUrl(`admin/editProduct/${p.id}`);

  }
}
