const firebaseConfig = {
  apiKey: 'AIzaSyDVGtWJFczNYd3wgIjbhqz5Q3YOW7OW-Dc',
  authDomain: 'labo-social-net.firebaseapp.com',
  projectId: 'labo-social-net',
  storageBucket: 'labo-social-net.appspot.com',
  messagingSenderId: '665927646387',
  appId: '1:665927646387:web:76d0e359d37635f99844c6',
  measurementId: 'G-4NWK8XLQ8J',
};
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