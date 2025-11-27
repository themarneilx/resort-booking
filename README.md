# 🏝️ Resort Booking System

A modern, elegant resort booking web application built with **Next.js**, **Tailwind CSS**, and **PostgreSQL**.  
Designed to deliver a beautiful, responsive, and smooth user experience for guests booking resort accommodations online, backed by a robust and secure backend.

---

## ✨ Features

### 🔐 Authentication & Security
- **Custom Auth System:** Secure credential handling using `bcryptjs` for hashing and `jose` for JWT management.
- **Token Strategy:** Short-lived Access Tokens and secure, HTTP-Only Refresh Cookies.
- **Role-Based Access:** Dedicated portals for **Users** and **Admins**.

### 🛏️ Booking & Management
- **Transactional Booking:** Prevents double-bookings with row-level locking and database transactions.
- **Real-time Availability:** Advanced SQL logic to check room status against requested dates.
- **User Dashboard:** Personalized portal (`/manage`) for guests to view upcoming stays, booking history, and profile details.
- **Admin Dashboard:** Comprehensive overview (`/admin/dashboard`) for resort managers to track revenue, occupancy, and booking requests.

### 🎨 UI / Frontend
- **Next.js App Router:** Leveraging Server Components and Server Actions for performance.
- **Modern Design:** Styled with **Tailwind CSS** and custom utility classes for a "Glassmorphism" aesthetic.
- **Animations:** Smooth transitions using **GSAP** and CSS animations.
- **Responsive:** Fully optimized mobile layouts with interactive menus.

### ⚙️ Backend
- **PostgreSQL:** Relational database for structured data integrity.
- **Drizzle ORM:** Type-safe, high-performance database queries.
- **API Routes:** RESTful endpoints for authentication (`/api/auth/*`).
- **Server Actions:** Secure mutations for booking creation and data fetching.

---

## 🚀 Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 15 (App Router) |
| **Database** | PostgreSQL |
| **ORM** | Drizzle ORM |
| **Auth** | JWT (jose) + bcryptjs |
| **Styling** | Tailwind CSS + React Icons |
| **Validation** | Zod |

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/themarneilx/resort-booking.git
cd resort-booking
```

### 2. Install dependencies
```bash
npm install
```

### 3. Database Setup (PostgreSQL)
Ensure you have PostgreSQL installed and running on your machine.

1.  **Create a Database:**
    ```bash
    createdb resort_booking
    ```
    *(Or use your preferred SQL tool like pgAdmin or DBeaver)*

2.  **Configure Environment Variables:**
    Create a `.env` file in the root directory (copy from `.env.example` if available) and add your credentials:
    ```env
    # Database Connection
    DATABASE_URL="postgres://YOUR_USERNAME:YOUR_PASSWORD@localhost:5432/resort_booking"

    # Authentication Secrets (Generate random strings for production)
    JWT_SECRET="your-secret-jwt-key"
    REFRESH_SECRET="your-secret-refresh-key"
    ```

3.  **Run Migrations:**
    Push the Drizzle schema to your database to create the tables (`users`, `bookings`, `rooms`, etc.).
    ```bash
    npx drizzle-kit push
    ```

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🧪 Testing the Flow

1.  **Sign Up:** Visit `/signup` to create a new account.
2.  **Login:** Use your credentials at `/login`.
3.  **User Dashboard:** You will be redirected to `/manage` where you can see your profile and (mock) bookings.
4.  **Admin Dashboard:** Manually update your user role to `'ADMIN'` in the database to access `/admin/dashboard`.

---

## 🙌 Contributing

Contributions are welcome!
Open an issue or submit a pull request for suggestions, improvements, or bug fixes.
