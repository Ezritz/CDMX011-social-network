import { firebaseConfig } from './firebase.config.js';

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signIn = (email, password) => firebase.auth() 
  .signInWithEmailAndPassword(email, password);

export const createUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

const provider = new firebase.auth.GoogleAuthProvider();
export const googleRegister = () => firebase.auth()
  .signInWithPopup(provider);
export const signOut = () => firebase.auth().signOut();
export const getUser = () => firebase.auth().currentUser;

export const verifyUser = (user) => user
  .sendEmailVerification();
export const stateSesion = (user) => firebase.auth()
  .onAuthStateChanged(user); 