import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {Product} from '../../types/product.type';
import {Router} from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {

  public productList: Map<string, number> = new Map();
  private shoppingCart: Array<Product> = [];
  public distinctProducts: Array<Product> = [];
  public total = 0.00;

  constructor(private productService: ProductService, private router: Router) {
  }

  async ngOnInit() {
    await this.loadCart();
    this.productService.shoppingCartState$.subscribe(async () => {
      await this.loadCart();
    });
  }

  private async loadCart() {
    this.shoppingCart = await this.productService.getShoppingCart();
    this.distinctProducts = this.removeDuplicates(this.shoppingCart, 'id');

    this.productList = new Map();
    this.total = 0.00;

    for (const product of this.shoppingCart) {
      const amount = this.productList.get(product.id);
      this.productList.set(product.id, amount === undefined ? 1 : amount + 1);
      this.total += product.specialOffer;
    }
  }

  removeDuplicates(myArr, prop) {
    return myArr.filter((obj, pos, arr) => {
      return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
    });
  }

  async decrement(product: Product) {
    await this.productService.removeFromShoppingCart(product);
  }

  async increment(product: Product) {
    await this.productService.addProductToShoppingCart(product);
  }

  async checkOut() {
    await this.router.navigate(['/check-out']);
  }
}
