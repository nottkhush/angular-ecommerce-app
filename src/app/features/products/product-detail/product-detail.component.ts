import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Product } from '../../../shared/models/product.model';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './product-detail.html',
    styleUrls: ['./product-detail.css']
})
export class ProductDetailComponent implements OnInit {
    product: Product | null = null;
    loading: boolean = true;
    error: string = '';
    addedToCart: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private productService: ProductService,
        private cartService: CartService
    ) { }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            if (id) {
                this.loadProduct(id);
            } else {
                this.error = 'Invalid product ID';
                this.loading = false;
            }
        });
    }

    loadProduct(id: number): void {
        this.loading = true;
        this.error = '';

        this.productService.getProductById(id).subscribe({
            next: (product) => {
                this.product = product;
                this.loading = false;
            },
            error: (err) => {
                console.error('Error fetching product', err);
                this.error = 'Failed to load product details. Please try again later.';
                this.loading = false;
            }
        });
    }

    addToCart(): void {
        if (this.product) {
            this.cartService.addToCart(this.product);
            this.addedToCart = true;

            // Reset button state after 2 seconds
            setTimeout(() => {
                this.addedToCart = false;
            }, 2000);
        }
    }

    getRatingStars(rate: number = 0): number[] {
        return Array(Math.round(rate)).fill(0);
    }

    getEmptyStars(rate: number = 0): number[] {
        return Array(5 - Math.round(rate)).fill(0);
    }
}
