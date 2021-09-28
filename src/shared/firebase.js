// Import the functions you need from the SDKs you need
import { initializeApp} from "firebase/app";

import {
  getFirestore,
  doc,
  query,
  collection,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  where,
  deleteDoc 
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://user-posts-9df11-default-rtdb.firebaseio.com"
// });
export const db = getFirestore(app);
export async function getCategories() {
  const q = query(collection(db, "categories"));
  const querySnapshot = await getDocs(q);

  if (querySnapshot.size == 0) {
    return [];
  } else {
    const categories = [];
    querySnapshot.forEach((doc) => {
      categories.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    return categories;
  }
}
export async function deleteCategory(id) {
    const docRef = await deleteDoc(doc(db, "categories",id));    
    return docRef;
}
export async function deletePost(uid,id) {
  const docRef = await deleteDoc(doc(db, `users/${uid}/posts/${id}`));    
  return docRef;
}
export async function addCategory(data) {
  
  const docRef=collection(db, "categories")
  const docSnapshot =await getDocs(docRef)
  if(docSnapshot.size==0)
  {
    const docRef = await addDoc(collection(db, "categories"), { name: data });
    return { id:docRef.id,name: data };
  }else{
    const q = query(docRef, where("name", "==", data));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.size == 0) {
      const docRef = await addDoc(collection(db, "categories"), { name: data });
      
      return { id:docRef.id,name: data };
    } else {
      let id;
      querySnapshot.forEach((doc) => {
        id = doc.id;
      });
      return { id,name: data };;
    }
  }
    
}
export async function addPost(uid, data) {
  
  const collectionRef=collection(db, `users/${uid}/posts`)
  const docRef = await addDoc(collection(db, `users/${uid}/posts`), data);
  return docRef.id;
}

export async function addProfileData(id, data) {
  
  await setDoc(doc(db, "users", id), data);
}
export async function updateProfileData(id, data) {
  
  await updateDoc(doc(db, "users", id), data);
}
// Get a list of cities from your database
export async function getUsers() {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const usersList = usersSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return usersList;
}
export async function getUsersPosts(uid) {
  const postsCol = collection(db, `users/${uid}/posts`);
  const postsSnapshot = await getDocs(postsCol);
  const postsList = postsSnapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
  return postsList;
}

const auth = getAuth();

// Start listing users from the beginning, 1000 at a time.


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
    return error;
  }
};
export const uploadPicture = async (file, pathToFileDirectory) => {
  
  return new Promise(function (resolve, reject) {
    if (file == null) return;
    const storage = getStorage();
    const fileExt =
      file.name.split(".")[(file.name + "").split(".").length - 1];
    const storageRef = ref(storage, `${pathToFileDirectory}/${file.name}`);
    // const storageRef = ref(storage, "images/" + file.name);
    const metadata = {
      contentType: `image/${fileExt}`,
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);
    // const uploadTask = uploadBytes(storageRef, file, metadata);
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            reject(error);
            break;
          case "storage/canceled":
            // User canceled the upload
            reject(error);
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            reject(error);
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
  // .on("state_changed" , alert("success") , alert);
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
    return error;
  }
};
export const signOff = async (email, password) => {
  try {
    const auth = getAuth();
    await signOut(auth);
  } catch (error) {
    console.log(error.code, error.message);
  }
};
