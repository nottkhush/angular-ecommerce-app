import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, of } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs/operators';
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

    private query$ = this.search.valueChanges.pipe(
        debounceTime(300),
        map(v => v.trim().toLowerCase()),
        startWith(''),
        distinctUntilChanged()
    );

    private categories$ = this.productService.getCategories().pipe(
        map(c => ['All', ...c]),
        catchError(() => of(['All'])),
        shareReplay({ bufferSize: 1, refCount: true })
    );

    // switchMap cancels the previous in-flight request when the query or category changes
    private results$ = combineLatest([this.query$, this.category$]).pipe(
        switchMap(([query, category]) =>
            this.productService.getProducts(query, category).pipe(
                map(products => ({ products, error: false })),
                catchError(() => of({ products: [] as Product[], error: true }))
            )
        )
    );

    readonly vm$ = combineLatest([this.results$, this.categories$, this.category$, this.page$]).pipe(
        map(([res, categories, category, page]) => {
            const totalPages = Math.max(1, Math.ceil(res.products.length / this.itemsPerPage));
            const currentPage = Math.min(Math.max(page, 1), totalPages);
            const start = (currentPage - 1) * this.itemsPerPage;

            return {
                error: res.error,
                categories,
                activeCategory: category,
                total: res.products.length,
                items: res.products.slice(start, start + this.itemsPerPage),
                currentPage,
                totalPages,
                pages: Array.from({ length: totalPages }, (_, i) => i + 1)
            };
        })
    );

    constructor() {
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
