import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  cartItemCount: number = 0;

  constructor(public cartService: CartService) {
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }
}
