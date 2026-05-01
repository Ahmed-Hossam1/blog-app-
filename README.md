# 🚀 Blogy - Modern Full-Stack Blog Platform

A premium, full-stack, and heavily optimized blog application built with **Next.js 16 (App Router)**, **MongoDB**, **Prisma**, and **Tailwind CSS 4**. This project features a robust authentication system, comprehensive internationalization (i18n), AI-powered integrations, and a deeply refined user experience.

## ✨ Key Features

- **🌍 Full Internationalization (i18n)**: Seamless support for English and Arabic (RTL) across the entire UI, including highly-localized API error/success responses.
- **🔐 Hardened Authentication & Security**: Secure user sign-up, sign-in, password recovery, and OAuth (Google/GitHub) via **NextAuth.js**. All API routes are protected by robust server-side session validation to prevent unauthorized access and data leakage.
- **📝 Advanced Blog Management**: Create, read, and manage blog posts with rich metadata (read time, views). Includes draft saving, publishing workflows, bookmarks, and likes.
- **💬 Interactive Comments System**: Deeply nested, recursive commenting feature with real-time optimistic UI updates and secure deletion flows.
- **🤖 AI Chatbot Integration**: Built-in intelligent assistant powered by the Gemini API, providing contextual help and interactive experiences.
- **☁️ Cloudinary Image Uploads**: Secure, server-side validated image uploads for blog covers and user avatars.
- **⚡ Performance & UX First**: 
  - Dynamic streaming with heavily optimized, layout-matching **Skeleton Loaders** to prevent layout shift.
  - Staggered entry animations powered by **Framer Motion**.
  - Optimized database querying using Prisma's `_count` and robust caching strategies.
- **👤 Social & Author Profiles**: Dedicated dynamic pages for blog authors, follower systems, and rich interactive author cards.
- **🎨 Premium Dark Mode & UI**: Beautifully designed responsive layouts using **Tailwind CSS 4**, featuring glassmorphism, dynamic gradients, and modern typography.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/) & [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js v4](https://next-auth.js.org/)
- **Styling & UI**: [Tailwind CSS 4](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Localization**: `i18next` & `react-i18next`
- **File Storage**: [Cloudinary](https://cloudinary.com/)
- **AI Integration**: [Google Gemini AI](https://deepmind.google/technologies/gemini/)
- **Form Validation**: [react-hook-form](https://react-hook-form.com/) & [Yup](https://github.com/jquense/yup)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v18+` or `v20+` recommended
- **MongoDB**: A running instance (local or MongoDB Atlas)
- **Cloudinary Account**: For handling image uploads
- **Google Gemini API Key**: For the AI chatbot features

### Installation

1. **Clone the repository**:
   ```bash
   git clone <repo-url>
   cd first-next-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env.local` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/blogs"
   NEXTAUTH_SECRET="your-secret-key"
   NEXT_PUBLIC_SITE_URL="http://localhost:3000"
   
   # OAuth
   GOOGLE_CLIENT_ID="your_google_id"
   GOOGLE_CLIENT_SECRET="your_google_secret"
   GITHUB_CLIENT_ID="your_github_id"
   GITHUB_CLIENT_SECRET="your_github_secret"
   
   # Cloudinary
   CLOUDINARY_NAME="your_cloud_name"
   CLOUDINARY_API_KEY="your_api_key"
   CLOUDINARY_SECRET_KEY="your_api_secret"
   
   # AI
   GEMINI_API_KEY="your_gemini_key"
   
   # Email Service
   EMAIL_USER="your_email"
   EMAIL_PASS="your_app_password"
   ```

4. **Database Setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   # Optional: Seed the database with mock users and blogs
   npx ts-node src/prisma/seed.ts 
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Architecture Overview

- `src/app`: Next.js App Router pages, highly-optimized streaming layouts, and robust, authenticated API routes.
- `src/components`: UI components organized organically (cards, layouts, sections, specialized skeletons).
- `src/locales`: Extensive JSON translation dictionaries for English (`en`) and Arabic (`ar`).
- `src/services`: Reusable database service layer abstraction for handling Prisma queries efficiently.
- `src/prisma`: Prisma schema definitions and database seeding scripts.

---
*Built with ❤️ for a modern, global web experience.*
