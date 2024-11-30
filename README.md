# BRIGHTPATH LMS

**POWERED BY :**

<p  align="center"><a  href="https://laravel.com"  target="_blank"><img  src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg"  width="400"  alt="Laravel Logo"></a></p>

## About BrightPath

BrightPath is an innovative Learning Management System (LMS) built with Laravel, ReactJS (InertiaJS), and FilamentPHP. It is designed to simplify and enhance the online learning experience for teachers and students by providing comprehensive tools for classroom management, task submissions, discussions, and learning modules.

BrightPath aims to be a powerful yet user-friendly platform where educators can create and manage learning materials while students can access their courses, submit assignments, and engage in interactive discussions, all in one place.

### Key Features:

-   **Classroom Management**: Teachers can create and manage multiple classrooms with unique access codes for students to join.

-   **Learning Modules**: Upload and organize learning materials, including rich content, images, and documents.

-   **Task Submissions**: Teachers can assign tasks to students, with built-in deadlines and file upload features, similar to Google Classroom.

-   **Interactive Discussions**: Students and teachers can engage in forums for in-class discussions.

-   **Performance Analytics**: Teachers can track classroom stats and monitor student progress through the platform.

## Technology Stack:

BrightPath is built using modern web technologies:

-   **Laravel**: For backend and API logic, ensuring robustness and ease of development.

-   **ReactJS (InertiaJS)**: Frontend interface for dynamic user interactions, providing a seamless SPA-like experience.

-   **FilamentPHP**: Admin and teacher panel for managing courses, users, and content efficiently.

-   **TailwindCSS**: For responsive and modern styling.

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

-   [Simple, fast routing engine](https://laravel.com/docs/routing).

-   [Powerful dependency injection container](https://laravel.com/docs/container).

-   Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.

-   Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).

-   Database agnostic [schema migrations](https://laravel.com/docs/migrations).

-   [Robust background job processing](https://laravel.com/docs/queues).

-   [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

## Installation/Deployment

1.  Duplicate .env.example and rename it .env
2.  Config .env file (APP_URL, APP_KEY, DB_CONNECTION, etc)
3.  Add gemini API key "GEMINI_AI_KEY=**your api key**" to the .env file
4.  Open terminal
5.  Run "composer install"
6.  Run "npm install"
7.  Run "npm run build"
8.  Run "php artisan migrate"
9.  Initialize default role by run "php artisan db:seed --class=ShieldSeeder"
10. Create Super Admin account by run "php artisan shield:super-admin"
11. Access admin panel on route /admin
