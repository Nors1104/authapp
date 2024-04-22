import { Component } from '@angular/core';
import { Product } from '@features/products/models/product.model';
import { ProductsService } from '@features/products/services/products.service';

@Component({
  selector: 'app-product-page',
  standalone: true,
  imports: [],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.scss',
})
export class ProductPageComponent {
  products: Product[] = [];
  // nombre;
  // estado;
  // precio;
  // category;
  // descripcion;
  // disponible;
  constructor(private readonly productsService: ProductsService) {
    this.findProducts();
  }

  findProducts() {
    this.products = this.productsService.findProducts();
  }
}
