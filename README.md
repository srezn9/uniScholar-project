# UniScholar 🎓

**Live URL:** [https://unischolar-fb37b.web.app/](https://unischolar-fb37b.web.app/)

## 📌 Purpose

**UniScholar** is a full-featured Scholarship Management System built to help students apply for university scholarships easily while allowing admins and moderators to manage scholarships, applications, and user activities in an organized manner.

It supports role-based dashboards for users, moderators, and administrators, and offers features like secure payments, application tracking, review systems, and analytics.

---

## ✨ Key Features

- 🔐 **Authentication** with Firebase (email/password login)
- 🧑‍🎓 **Student Dashboard**: Apply for scholarships, track applications, write reviews
- 🛠️ **Moderator Panel**: Manage scholarships, give feedback, update application statuses
- 🧑‍💼 **Admin Dashboard**: Manage users, assign roles, view analytics, delete accounts
- 💳 **Stripe Payment Integration**: Handle service charges securely
- 📈 **Analytics**: Visualize application data using charts (Recharts)
- 📝 **Review System**: Users can review scholarships; moderators can manage reviews
- ⚙️ **Role-based Route Protection**
- 📋 **Form Handling** with React Hook Form
- 📡 **Data Fetching** using TanStack Query
- 🍞 **Alerts & Notifications** using SweetAlert2
- 🌐 **SEO Support** using `react-helmet-async`

---

## 🛠️ Technologies & Packages Used

### Frontend

- **React** `^19.1.0`
- **Vite** `^7.0.0`
- **React Router** `^7.6.3`
- **Tailwind CSS** `^4.1.11`
- **DaisyUI** `^5.0.46`
- **Swiper** `^11.2.10` (Carousel support)
- **Recharts** `^3.1.0` (Analytics charts)

### Forms & State

- **React Hook Form** `^7.60.0`
- **TanStack React Query** `^5.81.5`

### Backend Integration

- **Axios** `^1.10.0`
- **Stripe (React + JS SDKs)** `^3.7.0` & `^7.4.0`

### Firebase

- **Firebase SDK** `^11.10.0`

### UI/UX

- **SweetAlert2** `^11.22.2`
- **React Icons** `^5.5.0`
- **React Helmet Async** `^2.0.5` (for SEO)

### Development Tools

- **ESLint**, **React Refresh**, **Vite Plugin React**

---

## 🚀 Setup & Run Locally

```bash
git clonehttps://github.com/Programming-Hero-Web-Course4/b11a12-client-side-srezn9
cd unischolar-client
npm install
npm run dev
```
