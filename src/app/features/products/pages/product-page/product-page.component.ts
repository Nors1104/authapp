import { Component } from '@angular/core';
import { AddProductFormComponent } from '@features/products/components/add-product-form/add-product-form.component';
import { ProductListComponent } from '@features/products/components/product-list/product-list.component';
import { Product } from '@features/products/models/product.model';
import { ProductsService } from '@features/products/services/products.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [ProductListComponent, AddProductFormComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {}
