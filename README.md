# YourLib API

Personal library manager API built with NestJS and MongoDB. Users organize their books, authors and genres, lend books to other people, and manage a waitlist per book with email notifications.

## Highlights

- **Books** – Each user has a private collection with status (`AVAILABLE` / `BORROWED`), condition and filters.
- **Loans** – Registering a loan marks the book as borrowed. Loans move through `BORROWED`, `RETURNED` and `OVERDUE`, with separate active and history views.
- **Waitlists** – Queue per book with automatic position management. People are notified by email when they join, when their position changes and when they are removed.
- **Global and private catalogs** – Admins manage global authors and genres. Users can create private ones.
- **Auth** – JWT with `USER` and `ADMIN` roles.
- **Emails** – Nodemailer with EJS templates.
- **CI/CD** – GitHub Actions runs ESLint and Prettier, builds the app and deploys to Vercel.

## Stack

NestJS · TypeScript · MongoDB · Mongoose · JWT · Nodemailer · Swagger · Docker · GitHub Actions · Vercel

## Main endpoints

| Method | Route | Description |
| --- | --- | --- |
| `POST` | `/session/login` | Login |
| `*` | `/users/books` | User's books (CRUD + filters) |
| `*` | `/users/authors`, `/users/genres` | User's private authors and genres |
| `*` | `/admin/authors`, `/admin/genres` | Global authors and genres |
| `POST` | `/users/loans` | Register a loan |
| `GET` | `/users/loans/active`, `/users/loans/history` | Active loans and history |
| `PATCH` | `/users/loans/:id` | Update loan status |
| `POST` | `/users/waitlists` | Add someone to a book's waitlist |
| `GET` | `/users/waitlists/:bookId` | Waitlist for a book |
| `*` | `/admin/users` | User management |

Swagger UI: `http://localhost:3000/docs`

## Running locally

```bash
cp .env.example .env      # fill in MongoDB, JWT and SMTP settings
docker compose up -d      # MongoDB + Mongo Express (:8081)
npm install
npm run start:dev
```

---

Built by [Silas Santos](https://github.com/silasoli) · [LinkedIn](https://www.linkedin.com/in/silasoli/)
