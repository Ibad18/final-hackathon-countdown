import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCh4kEj57zF9KdIAd3ujn3CHtnmPRIElvI",
    authDomain: "final-hackathon-countdown.firebaseapp.com",
    projectId: "final-hackathon-countdown",
    storageBucket: "final-hackathon-countdown.appspot.com",
    messagingSenderId: "555490656288",
    appId: "1:555490656288:web:489bbd8eeb14658e327c45"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app);