import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCFRMjm9PkBg-NwapQzEppMOE5iy8OU4Zw",
  authDomain: "slack-clone-7d7dc.firebaseapp.com",
  projectId: "slack-clone-7d7dc",
  storageBucket: "slack-clone-7d7dc.appspot.com",
  messagingSenderId: "550344569528",
  appId: "1:550344569528:web:dca3322d849049d7d93a4d",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, db, provider };
