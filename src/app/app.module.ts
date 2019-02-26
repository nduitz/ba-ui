import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductListItemComponent } from './components/product-list-item/product-list-item.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { OrderComponent } from './components/order/order.component';
import { BasketComponent } from './components/basket/basket.component';
import { BasketDetailsComponent } from './components/basket-details/basket-details.component';
import { BasketDetailComponent } from './components/basket-detail/basket-detail.component';
import { BasketProductsListComponent } from './components/basket-products-list/basket-products-list.component';
import { BasketProductComponent } from './components/basket-product/basket-product.component';
import { environment } from 'src/environments/environment.prod';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers, metaReducers } from './reducers';
import { ProductEffect } from './effects/product.effect';
import { BasketEffect } from './effects/basket.effect';
import { FormsModule } from '@angular/forms';
import { FeatureEffect } from './effects/feature.effect';

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductListItemComponent,
    ProductDetailComponent,
    OrderComponent,
    BasketComponent,
    BasketDetailsComponent,
    BasketDetailComponent,
    BasketProductsListComponent,
    BasketProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    FormsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([ProductEffect, BasketEffect, FeatureEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
