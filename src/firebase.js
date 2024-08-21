import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
const firebaseConfig = {
    apiKey: "AIzaSyCh4kEj57zF9KdIAd3ujn3CHtnmPRIElvI",
    authDomain: "final-hackathon-countdown.firebaseapp.com",
    projectId: "final-hackathon-countdown",
    storageBucket: "final-hackathon-countdown.appspot.com",
    messagingSenderId: "555490656288",
    appId: "1:555490656288:web:489bbd8eeb14658e327c45"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

export { db, auth };