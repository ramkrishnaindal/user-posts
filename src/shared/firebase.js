// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0t-XHWc3AonmYat7_pEIiTxm99rNqEyI",
  authDomain: "user-posts-9df11.firebaseapp.com",
  databaseURL: "https://user-posts-9df11-default-rtdb.firebaseio.com",
  projectId: "user-posts-9df11",
  storageBucket: "user-posts-9df11.appspot.com",
  messagingSenderId: "70798554958",
  appId: "1:70798554958:web:a9ac5ebfd7d2ec5629101f",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

// Get a list of cities from your database
export async function getPosts(db) {
  const postsCol = collection(db, "posts");
  const postSnapshot = await getDocs(postsCol);
  const postsList = postSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return postsList;
}
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const token = localStorage.getItem("user_token");
    if (!token) localStorage.setItem("user_token", user.accessToken);
    const uidls = localStorage.getItem("user_id");
    if (!uidls) localStorage.setItem("user_id", user.uid);

    // ...
  } else {
    // User is signed out
    // ...
    const token = localStorage.getItem("user_token");
    if (token) localStorage.removeItem("user_token");
    const uidls = localStorage.getItem("user_id");
    if (!uidls) localStorage.removeItem("user_id");
  }
});
export const signUp = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.log(error.code, error.message);
  }
};
export const logIn = async (email, password) => {
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.log(error.code, error.message);
  }
};
export const signOff = async (email, password) => {
    try {
      const auth = getAuth();
      await signOut(
        auth
      );
      
    } catch (error) {
      console.log(error.code, error.message);
    }
  };
  