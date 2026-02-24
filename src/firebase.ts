
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * FIREBASE SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a new project named "First Voice Agri Bot"
 * 3. Add a Web App to your project.
 * 4. Copy the firebaseConfig object and replace the placeholder below.
 * 5. Enable "Phone" authentication in the Firebase Console.
 * 6. Enable "Cloud Firestore" in the Firebase Console.
 */

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
// Note: This will fail if the config is not valid. 
// In a real app, we'd use environment variables.
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
