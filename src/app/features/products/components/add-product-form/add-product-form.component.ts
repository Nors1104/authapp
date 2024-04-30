import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductsService } from '@features/products/services/products.service';
import { UserDataService } from '@features/auth/services/userData.service';
import { AuthService } from '@features/auth/services/auth.service';
import { UserService } from '@features/auth/services/user.service';

@Component({
  selector: 'add-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './add-product-form.component.html',
  styleUrl: './add-product-form.component.scss',
})
export class AddProductFormComponent {
  //userId: string = '';
  userId!: string;
  submitted = false;
  addProductForm = this.fb.group({
    nombre: ['', Validators.required],
    user: [
      '',
      [
        Validators.required,
        //Validators.isMongo
      ],
    ],
    precio: [''],
    category: ['', Validators.required],
    descripcion: [''],
    disponible: [''],
  });
  get datos() {
    return this.userDataService.id;
  }
  constructor(
    private fb: FormBuilder,
    private readonly productsService: ProductsService,
    private userDataService: UserDataService,
    private userservice: UserService
  ) {
    /*
    this.userDataService.currentUser.subscribe((id) => {
      debugger;
      this.userId = id;
    });*/
    this.userId = userservice.getId();
  }
  get controls(): { [key: string]: AbstractControl } {
    return this.addProductForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    const { ...form } = this.addProductForm.value!;
    //this.productsService.addProduct(form);
  }
}
