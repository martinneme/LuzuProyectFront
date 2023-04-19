import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyCSuqWPEiXxDvVjRN-5xmoNWkFqDmE2764",
    authDomain: "luzubbdd.firebaseapp.com",
    projectId: "luzubbdd",
    storageBucket: "luzubbdd.appspot.com",
    messagingSenderId: "763835114404",
    appId: "1:763835114404:web:c731858dcbcb5e52555731"
  };

 const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);
 


 export default db;
