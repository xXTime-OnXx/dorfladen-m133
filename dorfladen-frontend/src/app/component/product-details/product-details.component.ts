import { Component, OnInit } from '@angular/core';
import { Product } from '../../types/product.type';
import { ProductService } from '../../service/product.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private product: Product;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('productId');
    this.product = await this.productService.getProduct(id);
  }

}
