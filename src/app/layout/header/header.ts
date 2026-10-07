import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {
  cartItemCount: number = 0;

  constructor(
    public cartService: CartService,
    public authService: AuthService,
    private router: Router
  ) {
    this.cartService.cart$.subscribe(items => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
