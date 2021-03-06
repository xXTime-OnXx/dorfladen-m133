import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../types/product.type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mini-shopping-cart',
  templateUrl: './mini-shopping-cart.component.html',
  styleUrls: ['./mini-shopping-cart.component.scss']
})
export class MiniShoppingCartComponent implements OnInit {

  private shoppingCart: Array<Product>;
  public priceSum;

  constructor(private productService: ProductService, private router: Router) { }

  async ngOnInit() {
    this.productService.shoppingCartState$.subscribe(async () => {
      await this.updateCart();
    });
    this.updateCart();
  }

  private async updateCart() {
    this.shoppingCart = await this.productService.getShoppingCart();
    this.sumPrice();
  }

  private sumPrice() {
    let sum = 0.00;
    for (const product of this.shoppingCart) {
      sum += product.specialOffer;
    }
    this.priceSum = sum;
  }

  async showShoppingCartPage() {
    await this.router.navigate(['/shopping-cart']);
  }
}
