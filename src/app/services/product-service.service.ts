 import { Injectable } from '@angular/core';
 import {HttpClient} from "@angular/common/http";
 import {Observable} from "rxjs";
 import {Product} from "../model/product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {
  private host : string ="http://localhost:8089";

  constructor(private http :HttpClient) { }
  public getProduct(keyword : string="",page : number = 1 , size : number = 3){
     return  this.http.get(`${this.host}/products?name_like=${keyword}&_page=${page}&_limit=${size}`,{observe : 'response'});
  }
  public checkProduct(p : Product) : Observable<Product>{
     return this.http.patch<Product>(`${this.host}/products/${p.id}`,
       {checked : !p.checked});
  }
    public deleteProduct(p : Product) {
        return this.http.delete<any>(`${this.host}/products/${p.id}`);
    }


    saveProduct(product: Product):Observable<Product> {
      return this.http.post<Product>(`${this.host}/products`,product);

    }
    // searchProduct(keyword: string ,page : number , size : number):Observable<Array<Product>> {
    //     return this.http.get<Array<Product>>(`http://localhost:8089/products?name_like=${keyword}&_page=${page}&_limit=${size}`);
    //
    // }
  getProductById(productId: number) : Observable<Product> {
    return this.http.get<Product>(`${this.host}/products/${productId}`);


  }

  updateProduct(product: Product) :Observable<Product> {
    return this.http.put<Product>(`${this.host}/products/${product.id}`,product);

  }
}
