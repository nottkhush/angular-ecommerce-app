import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

    constructor(private router: Router) { }

    onSubmit() {
        this.isLoading = true;
        this.error = '';

        if (this.registerData.password !== this.registerData.confirmPassword) {
            this.error = 'Passwords do not match';
            this.isLoading = false;
            return;
        }

        // Simulate registration request
        setTimeout(() => {
            if (this.registerData.email && this.registerData.password) {
                this.success = true;
                this.isLoading = false;
                setTimeout(() => {
                    this.router.navigate(['/auth/login']);
                }, 1500);
            } else {
                this.error = 'Please fill out all fields correctly';
                this.isLoading = false;
            }
        }, 1000);
    }
}
