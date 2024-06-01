import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD2o68AobRBIz96kQFlL4d4_CXfdCC2xpk",
  authDomain: "chatapp-e7214.firebaseapp.com",
  projectId: "chatapp-e7214",
  storageBucket: "chatapp-e7214.appspot.com",
  messagingSenderId: "232701352306",
  appId: "1:232701352306:web:132f68700f71f0eea7a5eb",
  measurementId: "G-ZMNLT8EX6P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);