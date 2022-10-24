import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { useEffect, useState } from "react";
 
const firebaseConfig = {
    apiKey: "AIzaSyBt-2zQWfXGIWFsoFiG_imBTqXjOR6he6s",
    authDomain: "reactjsassignment-5ba49.firebaseapp.com",
    databaseURL: "https://reactjsassignment-5ba49-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "reactjsassignment-5ba49",
    storageBucket: "reactjsassignment-5ba49.appspot.com",
    messagingSenderId: "960186870922",
    appId: "1:960186870922:web:04c5215149588e1f2a5173",
    measurementId: "G-ZHXBSHC3TL"
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth()
const auth = getAuth()

export function signup(email,password) {
    return createUserWithEmailAndPassword(auth,email,password)
}

export function login(email,password) {
    return signInWithEmailAndPassword(auth,email,password)
}

export function useAuth() {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() =>{
      const unsub =  onAuthStateChanged(auth,user => setCurrentUser(user));
      return unsub;
    },[])

    return currentUser
}

//Logout
export function logout() {
    return signOut(auth)
}


