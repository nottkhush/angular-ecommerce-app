import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, shareReplay, startWith } from 'rxjs/operators';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { ProductCardComponent } from '../../../shared/product-card/product-card';

@Component({
    selector: 'app-product-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ReactiveFormsModule, ProductCardComponent],
    templateUrl: './product-list.html',
    styleUrls: ['./product-list.css']
})
export class ProductListComponent {
    private productService = inject(ProductService);
    private readonly itemsPerPage = 6;

    readonly search = new FormControl('', { nonNullable: true });
    private category$ = new BehaviorSubject<string>('All');
    private page$ = new BehaviorSubject<number>(1);

    private search$ = this.search.valueChanges.pipe(
        debounceTime(300),
        map(v => v.trim().toLowerCase()),
        startWith(''),
        distinctUntilChanged()
    );

    // One HTTP call, shared by every subscriber
    private products$ = this.productService.getProducts().pipe(
        map(products => ({ products, error: false })),
        catchError(() => of({ products: [] as Product[], error: true })),
        shareReplay({ bufferSize: 1, refCount: true })
    );

    readonly vm$ = combineLatest([this.products$, this.search$, this.category$, this.page$]).pipe(
        map(([res, query, category, page]) => {
            const filtered = res.products.filter(p =>
                (category === 'All' || p.category === category) &&
                (!query || p.title.toLowerCase().includes(query))
            );
            const totalPages = Math.max(1, Math.ceil(filtered.length / this.itemsPerPage));
            const currentPage = Math.min(Math.max(page, 1), totalPages);
            const start = (currentPage - 1) * this.itemsPerPage;

            return {
                error: res.error,
                categories: ['All', ...Array.from(new Set(res.products.map(p => p.category)))],
                activeCategory: category,
                total: filtered.length,
                items: filtered.slice(start, start + this.itemsPerPage),
                currentPage,
                totalPages,
                pages: Array.from({ length: totalPages }, (_, i) => i + 1)
            };
        })
    );

    constructor() {
        // New search term goes back to page 1
        this.search.valueChanges.pipe(takeUntilDestroyed()).subscribe(() => this.page$.next(1));
    }

    filterByCategory(category: string): void {
        this.category$.next(category);
        this.page$.next(1);
    }

    goToPage(page: number): void {
        this.page$.next(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    clearFilters(): void {
        this.search.setValue('');
        this.category$.next('All');
        this.page$.next(1);
    }

    trackById(_: number, product: Product): number {
        return product.id;
    }
}
