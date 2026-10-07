import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './login.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    loginData = {
        email: '',
        password: ''
    };
    isLoading = false;
    error = '';

    constructor(private router: Router, private route: ActivatedRoute) { }

    onSubmit() {
        this.isLoading = true;
        this.error = '';

        // Simulate login request
        setTimeout(() => {
            if (this.loginData.email && this.loginData.password) {
                localStorage.setItem('token', 'mock_token_123');
                const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
                this.router.navigateByUrl(returnUrl);
            } else {
                this.error = 'Please enter valid credentials';
                this.isLoading = false;
            }
        }, 1000);
    }
}
