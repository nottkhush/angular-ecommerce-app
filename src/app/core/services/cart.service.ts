import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartItem } from '../../shared/models/cart-item.model';
import { Product } from '../../shared/models/product.model';

@Injectable({
    providedIn: 'root'
})
export class CartService {
    private cartItems: CartItem[] = [];
    private cartSubject = new BehaviorSubject<CartItem[]>([]);
    public cart$: Observable<CartItem[]> = this.cartSubject.asObservable();

    constructor() { }

    addToCart(product: Product): void {
        const existingItem = this.cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cartItems.push({ product, quantity: 1 });
        }
        this.cartSubject.next(this.cartItems);
    }

    removeFromCart(productId: number): void {
        this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
        this.cartSubject.next(this.cartItems);
    }

    updateQuantity(productId: number, quantity: number): void {
        const item = this.cartItems.find(i => i.product.id === productId);
        if (item) {
            item.quantity = quantity;
            this.cartSubject.next(this.cartItems);
        }
    }

    getCartTotal(): number {
        return this.cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
    }

    getCartItemCount(): number {
        return this.cartItems.reduce((count, item) => count + item.quantity, 0);
    }
}
