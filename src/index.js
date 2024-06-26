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
} from "firebase/firestore";

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
    console.log(err.message);
  }
};

fetchBooks(colRef);

// Element selection
const addBook = document.querySelector(".add");
const deleteBook = document.querySelector(".delete");

// Adding data
addBook.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await addDoc(colRef, {
      title: addBook.title.value,
      author: addBook.author.value,
    });
    addBook.reset();
  } catch (err) {
    console.log(err.message);
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
    console.log(err.message);
  }
});

// Queries
const q = query(colRef, where("author", "==", "Ankur Warikoo"));

fetchBooks(q);
