# 🛍️ Angular E-Commerce Application

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![RxJS](https://img.shields.io/badge/RxJS-B7178C?style=for-the-badge&logo=reactivex&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-FCC72B?style=for-the-badge&logo=vitest&logoColor=black)

A modern, responsive, and fully-featured E-Commerce web application built with **Angular 21**. This project demonstrates a scalable architecture, standalone components, lazy loading, and modern web development best practices.

---

## ✨ Key Features

- **🔐 User Authentication**: Secure login and registration functionality.
- **📦 Product Catalog**: Browse products with detailed views.
- **🛒 Shopping Cart**: Add, edit, and remove items from the cart seamlessly.
- **💳 Checkout Flow**: Streamlined and secure checkout process.
- **⚡ Lazy Loading**: Optimized performance with route-based lazy loading.
- **📱 Responsive Design**: A beautiful, mobile-first UI experience.

---

## 🏗️ Tech Stack

- **Framework**: [Angular 21.1.0](https://github.com/angular/angular-cli)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Reactivity**: [RxJS](https://rxjs.dev/)
- **Testing**: [Vitest](https://vitest.dev/) for blazing-fast unit tests.

---

## 📁 Project Structure

The project follows a feature-based scalable architecture:

```text
src/
├── app/
│   ├── core/         # Singleton services, interceptors, and guards.
│   │   ├── guards/
│   │   ├── interceptors/
│   │   └── services/
│   ├── features/     # Feature modules (Lazy Loaded).
│   │   ├── auth/     # Login & Registration.
│   │   ├── cart/     # Shopping cart management.
│   │   ├── checkout/ # Checkout process.
│   │   ├── home/     # Landing page & dashboard.
│   │   └── products/ # Product catalog and details.
│   ├── layout/       # Shared UI layouts.
│   │   ├── footer/
│   │   └── header/
│   └── shared/       # Reusable UI components, pipes, and models.
│       ├── components/
│       ├── models/
│       ├── pipes/
│       └── product-card/
└── environments/     # Environment-specific configurations (dev vs prod).
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally.

### Prerequisites

Ensure you have the following installed:
- **Node.js**: `v24.x` or higher
- **npm**: `v11.x` or higher (The project uses npm v11.6.2)
- **Angular CLI**: Install globally via `npm install -g @angular/cli@21.1.0`

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/adsrikanth11/angular-ecommerce-app.git
   cd angular-ecommerce-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

The application uses Angular environments to manage different configurations (like API endpoints) for development and production.

- `src/environments/environment.development.ts`: Used for local development (`ng serve`).
- `src/environments/environment.ts`: Used for production (`ng build`).

Make sure to check or update the `apiUrl` in these files to point to your backend.


### Development Server

Run the development server sequentially:
```bash
npm start
# or
ng serve
```
Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Building for Production

Compile the project for production:
```bash
npm run build
# or
ng build
```
The build artifacts will be stored in the `dist/` directory.

### Running Tests

Execute unit tests utilizing the Vitest test runner:
```bash
npm test
# or
ng test
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! 
Feel free to check out the [issues page](../../issues).

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open-source and available under the terms of the [MIT License](LICENSE).

---
*Generated and maintained with ❤️ by [Srikanth Ambal Dhage](https://github.com/adsrikanth11)*
