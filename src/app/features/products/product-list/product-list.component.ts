import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { ProductCardComponent } from '../../../shared/product-card/product-card';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, ProductCardComponent],
    templateUrl: './product-list.html',
    styleUrls: ['./product-list.css']
})
export class ProductListComponent implements OnInit {
    products: Product[] = [];
    filteredProducts: Product[] = [];
    paginatedProducts: Product[] = []; // Products for current page
    categories: string[] = [];
    activeCategory: string = 'All';
    currentPage: number = 1;
    itemsPerPage: number = 6;
    totalPages: number = 1;
    loading: boolean = true;

    constructor(private productService: ProductService) { }

    ngOnInit(): void {
        this.productService.getProducts().subscribe({
            next: (products) => {
                this.products = products;
                this.filteredProducts = products;
                this.updatePagination();

                // Extract unique categories
                const allCategories = products.map(p => p.category);
                this.categories = ['All', ...Array.from(new Set(allCategories))];

                this.loading = false;
            },
            error: (err) => {
                console.error('Failed to load products', err);
                this.loading = false;
            }
        });
    }

    filterByCategory(category: string): void {
        this.activeCategory = category;
        if (category === 'All') {
            this.filteredProducts = this.products;
        } else {
            this.filteredProducts = this.products.filter(p => p.category === category);
        }

        this.currentPage = 1; // Reset to first page when filtering
        this.updatePagination();
    }

    updatePagination(): void {
        this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage);

        // Ensure current page is valid
        if (this.currentPage > this.totalPages && this.totalPages > 0) {
            this.currentPage = this.totalPages;
        } else if (this.currentPage < 1) {
            this.currentPage = 1;
        }

        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedProducts = this.filteredProducts.slice(startIndex, endIndex);
    }

    nextPage(): void {
        if (this.currentPage < this.totalPages) {
            this.currentPage++;
            this.updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    prevPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.updatePagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Helper to generate array of page numbers for template
    getPageNumbers(): number[] {
        return Array.from({ length: this.totalPages }, (_, i) => i + 1);
    }
}
