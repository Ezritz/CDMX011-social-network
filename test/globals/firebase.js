global.firebase = {
  initializeApp: () => console.log('firebase'),
  auth: () => ({
    signInWithEmailAndPassword: () => console.log('hi signin'),
  }),
};
