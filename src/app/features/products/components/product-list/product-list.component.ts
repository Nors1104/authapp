import { Component } from '@angular/core';
import { Product } from '@features/products/models/product.model';
import { ProductsService } from '@features/products/services/products.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  // nombre;
  // estado;
  // precio;
  // category;
  // descripcion;
  // disponible;
  constructor(
    private readonly productsService: ProductsService,
    private toastr: ToastrService
  ) {
    this.findProducts();
  }
  findProducts() {
    this.productsService.findProducts().subscribe({
      next: (response: any) => {
        this.products = response.products;
      },
      error: ({ error }) => {
        this.toastr.error('Error', error.msg);
      },
    });
  }
}
