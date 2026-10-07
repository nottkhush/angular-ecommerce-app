import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';
import { CartItem } from '../../../shared/models/cart-item.model';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cart-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './cart-page.html',
    styleUrls: ['./cart-page.css']
})
export class CartPageComponent implements OnInit {
    cartItems$: Observable<CartItem[]>;

    constructor(public cartService: CartService) {
        this.cartItems$ = this.cartService.cart$;
    }

    ngOnInit(): void { }

    updateQuantity(productId: number, newQuantity: number): void {
        if (newQuantity > 0) {
            this.cartService.updateQuantity(productId, newQuantity);
        }
    }

    removeItem(productId: number): void {
        this.cartService.removeFromCart(productId);
    }
}
