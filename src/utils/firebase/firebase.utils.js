import { initializeApp } from "firebase/app";
import {getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth'
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";


const firebaseConfig = {

    apiKey: "AIzaSyCvOIRwhowoIfBqUcwjBRl7Vw4QXFVpFO0",
  
    authDomain: "tienda-ropa-db-d38d9.firebaseapp.com",
  
    projectId: "tienda-ropa-db-d38d9",
  
    storageBucket: "tienda-ropa-db-d38d9.appspot.com",
  
    messagingSenderId: "403030807093",
  
    appId: "1:403030807093:web:d09f040bbed41c8ac7d77c"
  
  };
  
  
  // Initialize Firebase
  
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();

  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);
    console.log(userSnapshot.exists());
    console.log(userDocRef);

    //checo si el usuario existe
    if(!userSnapshot.exists()){
      const { displayName, email } = userAuth;

      const createdAt = new Date();

      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }

    return userDocRef;
  }