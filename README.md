# 📸 DigiMem — Your Digital Memory Vault

DigiMem is a powerful web-based application for storing, managing, organizing, and downloading digital photos — built for simplicity, speed, and security.

This full-stack app uses **Next.js**, **Apollo GraphQL**, **Clerk** for authentication, and **Cloudinary** for optimized media storage. Whether you're keeping travel memories, event albums, or personal archives, DigiMem helps you keep it all safe, sorted, and accessible.

---

##  Features

###  Core

- 🔐 Secure Auth with Clerk (Sign-in, Sign-up, Sessions)
- ☁️ Upload & Optimize Photos (Cloudinary + Dropzone)
- 🧾 Organized Albums/Collections
- 🔎 Search & Filter memories by tags or names
- 📥 Download original or optimized images

###  Developer Features

- 🔁 Apollo GraphQL Client & Server integration
- 🧠 TanStack React Query for local caching
- 📦 GraphQL Codegen setup

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** Next.js (App Router)
- **Media:** `react-dropzone`, Cloudinary
- **Auth:** Clerk
- **State:** TanStack Query
- **GraphQL:** Apollo Client + Codegen
- **Validation:** Zod + React Hook Form

### Backend

- **Server:** Node.js + Express
- **API:** Apollo Server (GraphQL)
- **ORM:** Prisma
- **Storage:** Cloudinary
- **Cache:** Redis (via ioredis)
- **Auth:** JWT

---
