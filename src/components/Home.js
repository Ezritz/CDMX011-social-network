import { getUser, verifyUser } from '../firebaseClient.js';

export const Home = () => {
  const user = getUser();
  const container = document.createElement('div');
    let html;
    console.log('user: ', user);
  if (user.emailVerified) {
    html = `
    <h2>Hola ${user ? user.email : ''}</h2>
    `;
    
  }
  else {
    verifyUser(user);
    html = `
    <p>Please verify your email in your email account</p>
    `;
  }
  container.innerHTML = html;
  return container;
};
