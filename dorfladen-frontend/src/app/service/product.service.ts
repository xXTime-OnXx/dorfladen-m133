import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../types/product.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private readonly http: HttpClient) {}

  public async getProducts(): Promise<Array<Product>> {
    return await this.http.get<Array<Product>>('http://localhost:8080/api/products').toPromise();
  }

  public async getProduct(productId: string): Promise<Product> {
    return await this.http.get<Product>('http://localhost:8080/api/product/' + productId).toPromise();
  }

}
