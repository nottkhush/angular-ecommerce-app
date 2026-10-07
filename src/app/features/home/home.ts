import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getFeaturedProducts(4).subscribe({
      next: (products) => {
        this.featuredProducts = products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load featured products', err);
        this.loading = false;
      }
    });
  }
}
