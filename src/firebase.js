import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAW-1iZ7Z-tQHu32lQE3lvUevEFwGZOnEI",
  authDomain: "cosmetics-ba479.firebaseapp.com",
  projectId: "cosmetics-ba479",
  storageBucket: "cosmetics-ba479.appspot.com",
  messagingSenderId: "967364352275",
  appId: "1:967364352275:web:9dde19ce1e7e0dcc5ae2e6",
  measurementId: "G-7J0XD584PG"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
