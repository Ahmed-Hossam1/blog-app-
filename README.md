# 🚀 Modern Blog Application

A full-stack, feature-rich blog application built with **Next.js 15**, **MongoDB**, **Prisma**, and **Tailwind CSS 4**. This project features a robust authentication system, blog management, comments, and a responsive design.

## ✨ Key Features

- **🔐 Authentication**: Secure user sign-up, sign-in, and password recovery using **NextAuth.js**.
- **📝 Blog Management**: Create, read, and manage blog posts with rich metadata (read time, views, etc.).
- **💬 Comments System**: Interactive commenting feature on blog posts.
- **👤 Author Profiles**: Dedicated pages for blog authors.
- **📱 Responsive UI**: Beautifully designed layouts using **Tailwind CSS 4** and **Headless UI**.
- **🔍 Explore Activities**: Filtering and sorting functionalities for discovering content.
- **📩 Contact Page**: Integrated contact form for user feedback.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Components**: [Headless UI](https://headlessui.com/)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20+` recommended
- **MongoDB**: A running instance (local or Atlas)

### Installation

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd first-next-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and add your credentials:
   ```env
   DATABASE_URL="mongodb+srv://<user>:<password>@cluster.mongodb.net/blog-app"
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Database Setup**:
   ```bash
   npx prisma generate
   npx prisma db push
   npm run seed
   ```

5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser.

## 📂 Project Structure

- `src/app`: App Router pages, layouts, and API routes.
- `src/components`: UI components organized by feature (cards, layout, sections, ui).
- `src/utils`: Helper functions and utilities.
- `prisma`: Database schema and seeding scripts.
- `public`: Static assets and images.

## 📜 Available Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint for code quality checks.

---
Built with ❤️ for a modern web experience.
