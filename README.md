## Local Setup

- git clone https://github.com/perez-rich/user-crud-test.git
- cd user-crud-test
- composer install 
- cp .env.example .env
- php artisan migrate --seed
- npm install
- npm run build
- php artisan serve

- Go to http://localhost:8000
- Login with example admin user:
    - Email: test@example.com
    - Password: test1234
