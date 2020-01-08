import { Component, OnInit } from '@angular/core';
import {Product} from '../../types/product.type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  private product: Product;

  constructor() { }

  ngOnInit() {
  }

}
