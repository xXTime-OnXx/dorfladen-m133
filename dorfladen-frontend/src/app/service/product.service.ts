import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../types/product.type';
import {Subject} from 'rxjs';
import {Checkout} from "../types/checkout.type";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public shoppingCartState$: Subject<void> = new Subject<void>();

  constructor(private readonly http: HttpClient) {}

  public async getProducts(): Promise<Array<Product>> {
    return await this.http.get<Array<Product>>('http://localhost:8080/api/products').toPromise();
  }

  public async getProduct(productId: string): Promise<Product> {
    return await this.http.get<Product>('http://localhost:8080/api/product/' + productId).toPromise();
  }

  public async getShoppingCart(): Promise<Array<Product>> {
    return await this.http.get<Array<Product>>('http://localhost:8080/api/shopping-cart').toPromise();
  }

  public async addProductToShoppingCart(product: Product): Promise<void> {
    await this.http.post('http://localhost:8080/api/shopping-cart', product, {responseType: 'text'}).toPromise();
    this.shoppingCartState$.next();
  }

  public async removeFromShoppingCart(product: Product): Promise<void> {
    await this.http.put('http://localhost:8080/api/shopping-cart/delete', product, {responseType: 'text'}).toPromise();
    this.shoppingCartState$.next();
  }

  public async checkout(checkout: Checkout) {
    await this.http.put('http://localhost:8080/api/shopping-cart/checkout', checkout, {responseType: 'text'}).toPromise();
    this.shoppingCartState$.next();
  }
}
