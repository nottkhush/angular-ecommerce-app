import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-register',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './register.html',
    styleUrls: ['./register.css']
})
export class RegisterComponent {
    registerData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    isLoading = false;
    error = '';
    success = false;

    constructor(private router: Router, private authService: AuthService) { }

    onSubmit() {
        this.error = '';

        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.error = 'Passwords do not match';
            return;
        }

        this.isLoading = true;

        this.authService.register(
            this.registerData.name,
            this.registerData.email,
            this.registerData.password
        ).subscribe({
            next: () => {
                this.success = true;
                this.isLoading = false;
                setTimeout(() => this.router.navigate(['/']), 1500);
            },
            error: (err) => {
                this.error = err.error?.message || 'Registration failed. Please try again.';
                this.isLoading = false;
            }
        });
    }
}
