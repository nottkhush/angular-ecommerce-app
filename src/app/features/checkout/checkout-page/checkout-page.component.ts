import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../../core/services/cart.service';

@Component({
    selector: 'app-checkout-page',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './checkout-page.html',
    styleUrls: ['./checkout-page.css']
})
export class CheckoutPageComponent implements OnInit {
    checkoutData = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    };

    isProcessing = false;
    orderSuccess = false;
    total = 0;

    constructor(
        public cartService: CartService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.total = this.cartService.getCartTotal();

        // Redirect if cart is empty
        if (this.total === 0) {
            this.router.navigate(['/cart']);
        }
    }

    onSubmit(): void {
        this.isProcessing = true;

        // Simulate order processing API call
        setTimeout(() => {
            this.isProcessing = false;
            this.orderSuccess = true;

            // Clear cart
            // (In a real app, CartService would have a clearCart method)

            // Redirect to home after 3 seconds
            setTimeout(() => {
                this.router.navigate(['/']);
            }, 3000);
        }, 2000);
    }
}
