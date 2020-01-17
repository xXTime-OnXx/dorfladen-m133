import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss']
})
export class CheckOutComponent implements OnInit {
  firstname = '';
  lastname = '';
  email = '';

  constructor(private router: Router, private productService: ProductService) {
  }

  ngOnInit() {
  }

  async checkOut() {
    if (this.inputIsValid()) {
      await this.productService.checkout({firstname: this.firstname, lastname: this.lastname, email: this.email});
      await this.router.navigate(['overview']);
    }
  }

  inputIsValid() {
    if (!this.firstname.match(/^[a-zA-z]*$/)) {
      return false;
    }
    if (!this.firstname.match(/^[a-zA-z]*$/)) {
      return false;
    }
    if (!this.email.match(/[^@]+@[^\.]+\..+/)) {
      return false;
    }
    return true;
  }
}
