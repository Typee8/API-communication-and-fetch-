import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCGShHKbWgPSCOPVzoL8GvcP287Oyeczq0",
  authDomain: "travel-agency-javascript.firebaseapp.com",
  databaseURL:
    "https://travel-agency-javascript-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "travel-agency-javascript",
  storageBucket: "travel-agency-javascript.firebasestorage.app",
  messagingSenderId: "628054712472",
  appId: "1:628054712472:web:a4a55f95cd8eedf02eb0ed",
};

const app = initializeApp(firebaseConfig);

export default app;
