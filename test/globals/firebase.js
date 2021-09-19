global.firebase = {
  initializeApp: () => console.log('firebase'),
  auth: () => ({
    signInWithEmailAndPassword: () => Promise.resolve(),
    createUserWithEmailAndPassword: () => Promise.resolve(),
    onAuthStateChanged: () => Promise.resolve(),
  }),
  firestore: () => Promise.resolve(),
};
