# Workout Logger

#### Web application for logging and tracking workouts

## Installation

To run the app locally, follow these steps:

- clone this repo [by link](https://github.com/MarynaNakvas/workout-logger)
- run `npm install` to install dependencies
- run `npm run dev` to run the development server
- use the app at `http://localhost:3000`
- run `npm run build` to build the project for production
- run `npm run start` to run production app version
- run `npm run lint` to run ESLint for linting

## Features

Workout Logger allows users to log and track their workouts with the following key features:

- User authentication via email/password or Microsoft Entra single sign-on.
- The ability to create, edit, and delete workout entries.
- Record workout details like type, duration, distance.
- Integration with Microsoft Graph API: showing a user photo from the Microsoft account and save workouts to a calendar.

## Tech

The application was built using the following technologies:

- [Next.js](https://nextjs.org/) - A React framework.
- [TypeScript](https://www.typescriptlang.org/) - Strongly typed programming language that builds on JavaScript.
- [MobX](https://mobx.js.org/README.html) - A state management library for managing global and local state.
- [Microsoft Entra ID](https://entra.microsoft.com/) - A cloud-based identity and access management service.
- [Microsoft Graph API](https://developer.microsoft.com/en-us/graph) - A unified API that allows access to Microsoft 365 services and data.
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework for styling the app.
- [Backendless](https://backendless.com/) - A Backend-as-a-Service (BaaS) platform that provides cloud-based services (Real-time Database).
