import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OverviewComponent } from './page/overview/overview.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ProductService} from './service/product.service';
import { ProductDetailsComponent } from './page/product-details/product-details.component';
import { MiniShoppingCartComponent } from './component/mini-shopping-cart/mini-shopping-cart.component';
import {CustomHttpInterceptorService} from './http-interceptor';
import { ShoppingCartComponent } from './page/shopping-cart/shopping-cart.component';
import {FormsModule} from "@angular/forms";
import { CheckOutComponent } from './page/check-out/check-out.component';

@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    ProductDetailsComponent,
    MiniShoppingCartComponent,
    ShoppingCartComponent,
    CheckOutComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
    ],
  providers: [
    ProductService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CustomHttpInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
