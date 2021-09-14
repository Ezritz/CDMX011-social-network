import { createUser } from '../firebaseClient.js';
import { onNavigate } from '../main.js';

export const Register = () => {
  const container = document.createElement('div');

  const html = `
  <header></header>
  <div class="father">
    <div class="divChild">
      <section><img src="sweatshirt.png" alt="Logo" id="logo"></section>
      <h1 class="title">Trueque</h1>
      <p class="subtitle">La comunidad mas grande <br>
      de intercambio de ropa</p>
      <div id="divError">
        <p id="errorMessage"></p>
      </div>
    </div>
    <main>
    <form method="POST" id="formulario">
      <input type="email" id="userEmail" placeholder="alguien@example.com" required="required">
      <input type="password" id="userPassword" placeholder="Contraseña" required="required">
      <button id="registro">Registrate</button>
      <p class="frase">¿Tienes una cuenta? </p>
      <a href="" id="login">Inicia Sesion</a>
    </form>
    </main>
  <div>`;

  container.innerHTML = html;

  container.querySelector('#registro').addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('input[type=email]').value;
    const password = container.querySelector('input[type=password]').value;
    const errorM = container.querySelector('#errorMessage');
    console.log(email, password);
    createUser(email, password)
      .then(() => onNavigate('/wall'))
      .catch((error) => {
        errorM.innerHTML = error.message;
        container.querySelector('#divError').style.display = 'block';
      });
  });

  container.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/');
  });
  return container;
};
