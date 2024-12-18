import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCysiRHRBBYZHcMvafdNs34XIbF8PbHtSM",
  authDomain: "my-app-86d0d.firebaseapp.com",
  projectId: "my-app-86d0d",
  storageBucket: "my-app-86d0d.firebasestorage.app",
  messagingSenderId: "721827229942",
  appId: "1:721827229942:web:81254b62658b69fca2bcd7",
  measurementId: "G-1JR30XZZZF"
};


const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth =getAuth(app);
export const db= getFirestore(app);
export const provider = new GoogleAuthProvider();