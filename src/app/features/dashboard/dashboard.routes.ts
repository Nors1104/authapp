import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { authGuard } from '../auth/guards/auth.guard';
import { ReportPageComponent } from '@features/reports/pages/report-page/report-page.component';
import { UsersPageComponent } from '@features/users/pages/users-page/users-page.component';
import { ProductPageComponent } from '@features/products/pages/product-page/product-page.component';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    canActivate: [authGuard],
    children: [
      { path: 'reports', component: ReportPageComponent },
      { path: 'users', component: UsersPageComponent },
      {
        path: 'products',
        component: ProductPageComponent,
        canActivate: [authGuard],
      },
    ],
  },
];
