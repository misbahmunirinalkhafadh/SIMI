// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAH8OLC31RRqaFgf3nR300lsVU7-e37le0",
    authDomain: "simi-51185.firebaseapp.com",
    projectId: "simi-51185",
    storageBucket: "simi-51185.appspot.com",
    messagingSenderId: "775968924217",
    appId: "1:775968924217:web:1e75f4a24bee8469f423e8",
    measurementId: "G-6LCTKYML37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const storage = getStorage(app);
const db = getFirestore(app)

export { db }