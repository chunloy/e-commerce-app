// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXFZLmJ47WuLBv_nQZBS8QpCoANpyHKMs",
  authDomain: "e-commerce-db-83785.firebaseapp.com",
  projectId: "e-commerce-db-83785",
  storageBucket: "e-commerce-db-83785.appspot.com",
  messagingSenderId: "742507019573",
  appId: "1:742507019573:web:9951dd902c510fd8c6a07c"
};


// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize up provider instance
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

// Instantiate database
export const db = getFirestore();


// --------------------- Helpers ---------------------
// Create new document in db
export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
  if(!userAuth) return;

  const {uid, displayName, email} = userAuth;

  // get doc ref from db using user id
  const userDocRef = doc(db, 'users', uid);

  try {
    const userSnapshot = await getDoc(userDocRef);

    // add new user to db
    if(!userSnapshot.exists()) createUser(userDocRef, displayName, email, additionalInfo);
    
    return userDocRef;

  } catch(err) {
    console.log('Error creating user document reference', err);
  };
};

// Create new user in db
const createUser = async (userDocRef, displayName, email, additionalInfo) => {
  const createdAt = new Date();
  try {
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt,
      ...additionalInfo,
    })
  } catch(err) {
    console.log('Error creating user', err.message);
  };
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
    
  } catch (err) {
    console.log('Error creating user', err.message);
  };
};