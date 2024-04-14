import { Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductPageComponent,
  },
];
