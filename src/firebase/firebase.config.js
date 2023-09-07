// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAvbKeFFqqcKAVieELxf80zY87bjanTrSY",
  authDomain: "task-assign-interview.firebaseapp.com",
  projectId: "task-assign-interview",
  storageBucket: "task-assign-interview.appspot.com",
  messagingSenderId: "953127336870",
  appId: "1:953127336870:web:d394b6850043ec5cff2d67",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
