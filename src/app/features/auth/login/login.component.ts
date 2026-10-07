import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    loginData = { email: '', password: '' };
    isLoading = false;
    error = '';

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService
    ) { }

    onSubmit() {
        this.isLoading = true;
        this.error = '';

        this.authService.login(this.loginData.email, this.loginData.password).subscribe({
            next: () => {
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
                this.router.navigateByUrl(returnUrl);
            },
            error: (err) => {
                this.error = err.error?.message || 'Login failed. Please try again.';
                this.isLoading = false;
            }
        });
    }
}
