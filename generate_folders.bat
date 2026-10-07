@echo off
mkdir src\app\core\services 2>nul
mkdir src\app\core\interceptors 2>nul
mkdir src\app\core\guards 2>nul
mkdir src\app\shared\components 2>nul
mkdir src\app\shared\models 2>nul
mkdir src\app\shared\pipes 2>nul
call npx ng generate component layout/header
call npx ng generate component layout/footer
call npx ng generate module features/home --routing
call npx ng generate module features/products --routing
call npx ng generate module features/cart --routing
call npx ng generate module features/checkout --routing
call npx ng generate module features/auth --routing
echo Done
