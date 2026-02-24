
# First Voice Agri Bot - Setup Guide

This application is designed to help Indian farmers with a voice-first interface.

## 1. Firebase Setup (Mandatory for Backend)

To enable the database and authentication, follow these steps:

1.  **Create a Firebase Project**:
    - Go to [Firebase Console](https://console.firebase.google.com/).
    - Click "Add Project" and name it "First Voice Agri Bot".
2.  **Add a Web App**:
    - Click the `</>` icon to add a web app.
    - Register the app and copy the `firebaseConfig` object.
    - Open `src/firebase.ts` in this project and replace the placeholder config with your actual keys.
3.  **Enable Authentication**:
    - Go to "Build" > "Authentication" > "Get Started".
    - Enable the "Phone" sign-in provider.
4.  **Enable Firestore Database**:
    - Go to "Build" > "Firestore Database" > "Create Database".
    - Start in "Test Mode" (for development) and choose a location near India (e.g., `asia-south1`).
5.  **Firestore Structure**:
    - The app automatically handles data, but here is the structure it uses:
      - `users/{userId}`: Stores profile (name, location, crop, language).
      - `tasks/{userId}/userTasks/{taskId}`: Stores farm tasks.
      - `chats/{userId}/history/{chatId}`: Stores voice chat history.

## 2. Gemini AI Integration

The AI features are powered by Google Gemini.
- The API key is automatically handled by AI Studio.
- The system instructions are configured in `src/services/gemini.ts` to ensure the bot speaks simply and supports regional languages.

## 3. Deployment

1.  **Build the Project**:
    - Run `npm run build`.
2.  **Deploy to Firebase Hosting (Optional)**:
    - Install Firebase CLI: `npm install -g firebase-tools`.
    - Run `firebase login`.
    - Run `firebase init hosting`.
    - Run `firebase deploy`.

## 4. Voice Features

- **Speech-to-Text**: Uses the browser's Web Speech API. It supports Hindi, Marathi, Tamil, Telugu, Kannada, and English.
- **Text-to-Speech**: The bot will automatically read out its responses in the selected language.

## 5. Offline Support

The app monitors your internet connection. If the connection is lost, a warning message appears, and voice features may be limited until you are back online.
