import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home'
    },
    {
        path: 'products',
        loadChildren: () => import('./features/products/products-module').then(m => m.ProductsModule),
        title: 'Products'
    },
    {
        path: 'cart',
        loadChildren: () => import('./features/cart/cart-module').then(m => m.CartModule),
        title: 'Cart'
    },
    {
        path: 'checkout',
        canActivate: [authGuard],
        loadChildren: () => import('./features/checkout/checkout-module').then(m => m.CheckoutModule),
        title: 'Checkout'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule),
        title: 'Auth'
    },
    {
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component').then(m => m.NotFoundComponent),
        title: 'Not Found'
    }
];
