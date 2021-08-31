const firebaseConfig = {
  apiKey: "AIzaSyDVGtWJFczNYd3wgIjbhqz5Q3YOW7OW-Dc",
  authDomain: "labo-social-net.firebaseapp.com",
  projectId: "labo-social-net",
  storageBucket: "labo-social-net.appspot.com",
  messagingSenderId: "665927646387",
  appId: "1:665927646387:web:76d0e359d37635f99844c6",
  measurementId: "G-4NWK8XLQ8J"
};
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const signIn = (email, password) => firebase.auth()
  .signInWithEmailAndPassword(email, password);
export const createUser = (email, password) => firebase.auth()
  .createUserWithEmailAndPassword(email, password);

export const signOut = () => firebase.auth().signOut();

export const getUser = () => firebase.auth().currentUser;

/* ingreso con Google
buttonGoogle.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log('google sign in', result);
    })
    .catch((error) => {
      console.log('error ', error);
    });
});*/