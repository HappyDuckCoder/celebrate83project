# Introduction

This project is built to celebrate Women's Day on March 8th by providing an interactive and engaging web experience. Our goal is to create a unique and visually appealing application that allows users to send heartfelt messages, share memories, and interact in real time. By leveraging modern web technologies, we aim to deliver a smooth and immersive experience for all visitors.
Hello
## Members:

- **Trần Hải Đức** - Role: [Backend]
- **Nguyễn Đình Duy Phú** - Role: [Frontend]
- **Nguyễn Anh Thư** - Role: [Project Manager]

## Supporters:

- **Đặng Kiều My** - Contribution: [UX/UI]
- **Bùi Quang Hùng** - Contribution: [Feedback]
- **Nguyễn Anh Khoa** - Contribution: [Testing]

## Tools & Technologies Used:

- Next.js 15.1.6
- TypeScript
- Tailwind CSS
- Liveblocks
- Clerk
- Edgestore
- Groq (AI integration)

# Instructions

1. Clone this repository:
   ```bash
   git clone https://github.com/your-repo-url.git
   cd your-project-folder
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

# Process and Documents

## Stage 1: Initiation and Source Preparation

- Initialize Next.js:
  ```bash
  npx create-next-app@latest
  ```
- Set up ShadCN UI:
  ```bash
  npx shadcn@latest init -d
  npx shadcn@latest add button
  ```

## Stage 2: Realtime Collaboration with Liveblocks

- Install Liveblocks:
  ```bash
  npm install @liveblocks/client @liveblocks/react
  ```
- Initialize Liveblocks project:
  ```bash
  npx create-liveblocks-app@latest --init --framework react
  ```

## Stage 3: Authentication with Clerk

- Install Clerk:
  ```bash
  npm install @clerk/nextjs
  ```
- Wrap the application with ClerkProvider and add authentication.

## Stage 4: File Storage with Edgestore

- Install Edgestore:
  ```bash
  npm install edgestore
  ```
- Set up and configure storage handling.

## Stage 5: AI-powered Features with Groq

- Install Groq:
  ```bash
  npm install groq-sdk
  ```
- Integrate AI for content generation and personalization.

## Stage 6: Frontend Animations

Enhance user experience with smooth transitions and motion effects.

Implement a stylish loading screen for a better visual flow.

Utilize Lottie animations for engaging graphics and interactions.

Integrate Framer Motion for fluid UI animations and transitions.

Use ShadCN components for a consistent and modern design system

## Stage 7: Testing

- Perform unit and integration tests.

## Stage 8: Deployment

- Link deployment: [Link Deploy](https://83test-git-featrealtime-happyduckcoders-projects.vercel.app/)

# References

- Installing Next.js: [Next.js](https://nextjs.org/docs)
- Installing ShadCN: [ShadCN](https://ui.shadcn.com/)
- Installing Liveblocks: [Liveblocks](https://liveblocks.io/docs)
- Installing Clerk: [Clerk](https://clerk.com/docs)
- Installing Edgestore: [Edgestore](https://edgestore.dev/docs)
- Installing Groq: [Groq](https://groq.com/docs)
- Tailwind CSS setup: [Tailwind CSS](https://tailwindcss.com/docs/installation)
- TypeScript setup: [TypeScript](https://www.typescriptlang.org/docs/)

# hihihaha
