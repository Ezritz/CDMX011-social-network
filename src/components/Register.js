import { createUser, verifyUser } from '../firebaseClient.js';
import { onNavigate } from '../main.js';

export const Register = () => {
  const container = document.createElement('div');

  const html = `<main>
  <section class="contenedor"><img src="sweatshirt.png" alt="Logo" id="logo"></section>
  <h1 class="title">Trueque</h1> <br>
  <p class="subtitle">La comunidad mas grande <br>
  de intercambio de ropa</p>
  <form method="POST" id="signIn">
    <input type="email" id="userEmail" placeholder="alguien@example.com">
    <input type="password" id="userPassword" placeholder="Contraseña">
    <button id="registro">Registrate</button>
    
    <p class="frase">¿Tienes una cuenta? </p>
    <a href="" id="login">Inicia Sesion</a>
  </form>
  </main>`;

  container.innerHTML = html;

  container.querySelector('#registro').addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('input[type=email]').value;
    const password = container.querySelector('input[type=password]').value;
    console.log(email, password);
    createUser(email, password)
      .then(() => onNavigate('/wall'))
      .catch((error) => {
        alert('error registro: ', error.message);
      });
  });

  container.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });
  return container;
};
