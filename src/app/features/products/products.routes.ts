import { Routes } from '@angular/router';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { authGuard } from '@features/auth/guards/auth.guard';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    component: ProductPageComponent,
    canActivate: [authGuard],
  },
];
