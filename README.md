# Modern Blog Application

A high-performance, full-stack blog platform built with the latest web technologies. This application features dynamic content management, user authentication, and a sleek, responsive design.

## 🚀 Technologies Used

- **Framework**: [Next.js 16](https://nextjs.org/) 
- **TypeScript**: (https://www.typescriptlang.org/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **ORM**: [Prisma 6](https://www.prisma.io/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **UI Components**: [Headless UI](https://headlessui.com/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Runtime**: [Node.js](https://nodejs.org/)

## ✨ Features

- **Dynamic Blogging**: Create, read, and manage blog posts with categories, meta-data (read time, views), and rich content structure.
- **Commenting System**: Interactive comment sections for every blog post.
- **User Authentication**: Secure sign-in and sign-up flows using NextAuth.js.
- **Embedded Content**: Support for different content types (paragraphs, lists) within blog posts.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
- **Performance**: Leveraging Next.js 16's server-side rendering and static generation capabilities.
- **Database Seeding**: Built-in scripts to quickly populate the database with realistic sample data.

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js installed
- A MongoDB database (local or Atlas)

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add your connection strings:
```env
DATABASE_URL="your_mongodb_connection_string"
NEXTAUTH_SECRET="your_nextauth_secret"
NEXTAUTH_URL="http://localhost:3000"
```

### 4. Prisma Setup
Regenerate the Prisma client based on the local schema:
```bash
npx prisma generate
```

### 5. Seeding the Database
Populate your database with 20 realistic blog items and authors:
```bash
npx tsx prisma/seed.ts
```

### 6. Run the Application
```bash
npm run dev
```

## 📂 Project Structure

- `/src/app`: Next.js App Router pages and API routes.
- `/src/components`: Reusable UI components.
- `/prisma`: Database schema and seeding scripts.
- `/generated`: Automatically generated Prisma Client.
- `/public`: Static assets and images.
