import "./style.css";

import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDC964Tn-wWBdGobfARaAmcRzUhf67qLE4",
  authDomain: "learning-e2d24.firebaseapp.com",
  projectId: "learning-e2d24",
  storageBucket: "learning-e2d24.appspot.com",
  messagingSenderId: "377958973096",
  appId: "1:377958973096:web:3099321ad39e79c5dd8c9d",
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth = getAuth();

// Collection Reference
const colRef = collection(db, "books");

// get collection data

// getDocs(colRef)
//   .then((snapshot) => {
//     console.log(snapshot.docs);
//     let books = [];
//     snapshot.docs.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
//     console.log(books);
//   })
//   .catch((err) => console.log(err.message));

//Async/ await

// const fetchBooks = async () => {
//   try {
//     const snapshot = await getDocs(colRef);
//     // console.log(snapshot.docs);
//     let books = [];
//     snapshot.docs.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
//     console.log(books);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// fetchBooks();

const fetchBooks = (ref) => {
  try {
    onSnapshot(ref, (snapshot) => {
      let books = [];
      snapshot.docs.forEach((doc) => books.push({ ...doc.data(), id: doc.id }));
      console.log(books);
    });
  } catch (err) {
    console.error(err.message);
  }
};

// fetchBooks(colRef);

// Element selection
const addBook = document.querySelector(".add");
const deleteBook = document.querySelector(".delete");
const updateBook = document.querySelector(".update");

// Adding data
addBook.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(colRef, {
      title: addBook.title.value,
      author: addBook.author.value,
      createdAt: serverTimestamp(),
    });
    addBook.reset();
  } catch (err) {
    console.error(err.message);
  }
});

// Deleting data
deleteBook.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBook.id.value);

  try {
    await deleteDoc(docRef);
    deleteBook.reset();
  } catch (err) {
    console.error(err.message);
  }
});

// Queries
const q = query(colRef, where("author", "==", "Ankur Warikoo"));

// fetchBooks(q);

// Ordering Data & Timestamps (By default Ascending order)
const order = query(
  colRef,
  where("author", "==", "Ankur Warikoo"),
  orderBy("title", "desc")
);

// fetchBooks(order);

// Ordering with timestamp
const orderCreatedAt = query(colRef, orderBy("createdAt"));

fetchBooks(orderCreatedAt);

// Get a single document
const docRef = doc(db, "books", "iet9X9EHCG4GiTiw5hqe");

// const fetchSingleDocument = async () => {
//   try {
//     const doc = await getDoc(docRef);
//     console.log(doc.data(), doc.id);
//   } catch (err) {
//     console.log(err.message);
//   }
// };

// fetchSingleDocument();

// Real Time Listener
const fetchSingleDocument = () => {
  try {
    onSnapshot(docRef, (doc) => {
      console.log(doc.data(), doc.id);
    });
  } catch (err) {
    console.error(err.message);
  }
};

// fetchSingleDocument();

// Updating data
updateBook.addEventListener("submit", async (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateBook.id.value);

  try {
    await updateDoc(docRef, {
      title: "Make Epic Money",
    });
    updateBook.reset();
  } catch (err) {
    console.error(err.message);
  }
});

// Signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  try {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User Created: ", cred.user);
    signupForm.reset();
  } catch (err) {
    console.error(err.message);
  }
});

// LogIn & LogOut
const logoutBtn = document.querySelector(".logout");
logoutBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    await signOut(auth);
    console.log("The user Signed Out");
  } catch (err) {
    console.error(err.message);
  }
});

const loginForm = document.querySelector(".login");
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = loginForm.email.value;
  const password = loginForm.password.value;

  try {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    console.log("User Logged In: ", cred.user);
    loginForm.reset();
  } catch (err) {
    console.error(err.message);
  }
});
