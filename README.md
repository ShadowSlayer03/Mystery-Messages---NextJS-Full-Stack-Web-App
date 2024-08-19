# Mystery Messages

Mystery Messages is a full-stack application that allows users to send anonymous feedback to other users. This app is built using modern web technologies and provides a smooth and secure experience for users.

## Features

- **Anonymous Messaging:** Send anonymous messages to other users.
- **User Authentication:** Secure user login and registration with JWT and Bcrypt.
- **Form Validation:** Robust form validation using React Hook Forms and Zod.
- **UI Components:** Beautiful and accessible UI components using ShadCN and Magic UI.
- **Email Notifications:** Notify users via email using the Resend API.
- **Data Storage:** Secure data storage and retrieval using MongoDB and Mongoose.
- **Third-Party Integrations:** Leverage the power of the Gemini API for additional features.

## Tech Stack

- **Frontend:**
  - [Next.js](https://nextjs.org/) - The React Framework for Production.
  - [TypeScript](https://www.typescriptlang.org/) - A strongly typed programming language that builds on JavaScript, providing better tooling and type safety.
  - [ShadCN](https://shadcn.dev/) - UI components library.
  - [Magic UI](https://magic-ui.dev/) - A design system for beautiful interfaces.
  - [React Hook Forms](https://react-hook-form.com/) - Performant, flexible, and extensible forms with easy-to-use validation.
  - [Zod](https://zod.dev/) - TypeScript-first schema declaration and validation library.
  
- **Backend:**
  - [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction) - For building API endpoints.
  - [Bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.
  - [JWT (JSON Web Tokens)](https://jwt.io/) - For securely transmitting information between the frontend and backend.
  - [Gemini API](https://gemini.com/) - Third-party API for enhanced app functionality.

- **Authentication:**
  - [NextAuth.js](https://next-auth.js.org/) - A complete authentication solution for Next.js applications, offering support for multiple providers, secure session management, and easy customization.

- **Database:**
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing user data and messages.
  - [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js.

- **Email Integration:**
  - [Resend](https://resend.io/) - Email API for sending transactional emails.

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ShadowSlayer03/Mystery-Messages---NextJS-Full-Stack-Web-App.git

   cd mystery-messages
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

    Set up environment variables as given in the .env.sample file.

4. **Run the development server:**

   ```bash
   npm run dev
   ```

### Live Preview

A live preview of this website is hosted at [https://mystery-messages-arj.vercel.app](https://mystery-messages-arj.vercel.app)

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.

### Contact

For any inquiries or issues, please reach out to the developer at [sslayer441@gmail.com].
