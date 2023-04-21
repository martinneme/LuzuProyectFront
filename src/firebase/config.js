import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// const firebaseConfig = {
//     apiKey: "AIzaSyCSuqWPEiXxDvVjRN-5xmoNWkFqDmE2764",
//     authDomain: "luzubbdd.firebaseapp.com",
//     projectId: "luzubbdd",
//     storageBucket: "luzubbdd.appspot.com",
//     messagingSenderId: "763835114404",
//     appId: "1:763835114404:web:c731858dcbcb5e52555731"
//   };


//test
const firebaseConfig = {
  apiKey: "AIzaSyBgA_EswcPy1rcReIDCeVmPfhP5QG6piRs",
  authDomain: "testbbdd-92be5.firebaseapp.com",
  projectId: "testbbdd-92be5",
  storageBucket: "testbbdd-92be5.appspot.com",
  messagingSenderId: "686265737719",
  appId: "1:686265737719:web:71907cfead25f264f30ef2"
};

 const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);
 


 export default db;
