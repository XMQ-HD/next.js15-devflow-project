# 💻 DevFlow - Developer Community Platform

A modern full-stack web application inspired by Stack Overflow, built with **Next.js 15**, **MongoDB**, and **Tailwind CSS**. It enables developers to ask questions, share answers, vote, and grow their reputation within a collaborative community.

🔗 **Live Demo**: [https://next-js15-devflow-project.vercel.app/](https://next-js15-devflow-project.vercel.app/)

---

## 🧰 Tech Stack

### Frontend
- [x] Next.js 15 (App Router)
- [x] React 19
- [x] TypeScript
- [x] Tailwind CSS
- [x] ShadCN UI
- [x] React Hook Form
- [x] Markdown Editor with syntax support

### Backend
- [x] MongoDB (via Mongoose)
- [x] API Routes (Next.js handlers)
- [x] Clerk Authentication (OAuth + JWT)

### DevOps & Tools
- [x] Deployment: Vercel
- [x] Code Style: Prettier + ESLint
- [x] Version Control: Git + GitHub

---

## 🔥 Key Features

✅ **Authentication**  
Secure sign-in with NextAuth, supporting Email/Password, Google, and GitHub.

🏠 **Home Page**  
Displays questions with filters, search, and pagination for easy navigation.

🎯 **Recommendations**  
Personalized question suggestions shown on the home page.

📐 **Complex Layout**  
Organized design with popular questions and tags always in view.

📝 **Question Details**  
View questions with rich content, including images, links, and code blocks.

👍 **Voting on Questions**  
Upvote or downvote questions to highlight helpful content.

👁️ **View Counter**  
Track how many times each question has been viewed.

🔖 **Bookmarking**  
Save questions to revisit later from your profile or collection.

🖊️ **Answer Posting**  
MDX editor with light/dark mode support for formatting rich answers.

🤖 **AI Answer Generation**  
Generate smart, AI-powered answers to questions on demand.

🔽 **Answer Filtering**  
Sort answers by newest or most voted, with pagination for navigation.

🔼 **Answer Voting**  
Upvote or downvote answers to reflect their quality.

📚 **Collections**  
Organize your saved questions with filters, search, and pagination.

👥 **Community Page**  
Browse all registered users with search, filters, and pagination support.

🙋 **User Profile**  
Display user info, reputation, badges, and their Q&A activity with pagination.

💼 **Job Finder**  
Discover jobs with filtering, search, and location-based results.

🏷️ **Tags Page**  
Explore a list of all tags with question counts, filters, and pagination.

🔖 **Tag Details**  
View all questions under a specific tag with search and pagination.

🆕 **Ask a Question**  
User-friendly interface for posting new questions with validation.

✏️ **Edit & Delete**  
Update or remove your questions and answers with full authorization checks.

🌍 **Global Search**  
Search across questions, users, tags, and other platform entities.

📱 **Responsive Design**  
Fully optimized for desktop, tablet, and mobile devices.

⚡ **High Performance**  
Fast page loads and smooth transitions for better user experience.

🧱 **Modular Architecture**  
Reusable and maintainable codebase with clearly separated concerns.

---

## 📸 Screenshots

```markdown
![Homepage](./screenshots/home.png)
![Ask Page](./screenshots/ask.png)
![Answer Page](./screenshots/answer.png)


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

---

## 🙌 Acknowledgements

This project is heavily inspired by the **DevOverflow** app built in the  
[JavaScript Mastery Pro](https://www.jsmastery.pro/) course.  
Big thanks to @adrianhajdin and the JSM community for the guidance and structured project-based learning experience.

