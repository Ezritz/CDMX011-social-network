import { signIn, googleRegister } from '../firebaseClient.js';
import { onNavigate } from '../main.js';

export const Login = () => {
  const container = document.createElement('div');

  const html = `
  <header></header>
  <div class="father">
    <div class="divChild">
      <section class="contenedor"><img src="sweatshirt.png" alt="Logo" id="logo"></section>
      <h1 class="title">Trueque</h1>
      <p class="subtitle">La comunidad mas grande <br>
      de intercambio de ropa</p>
    </div>
    <main>
    <form method="POST" id="signIn">
      <input type="email" id="userEmail" placeholder="alguien@example.com" required="required"/>
      <input type="password" id="userPassword" placeholder="Contraseña" required="required"/>
      <button id="login">Inicia Sesion</button>
      <button id="googleLogin">Iniciar Sesion con Google</button>
      <p class="frase">¿No tienes una cuenta?</p>
      <a href="" id="registro">Registrate</a>
    </form>
    </main>
  </div>`;

  container.innerHTML = html;

  container.querySelector('#login').addEventListener('click', (e) => {
    e.preventDefault();
    const email = container.querySelector('input[type=email]').value;
    const password = container.querySelector('input[type=password]').value;
    console.log(email, password);
    signIn(email, password)
      .then(() => onNavigate('/wall'))
      .catch((error) => {
        alert('error: Debes ingresar los datos ', error.message);
      });
    console.log('singning');
  });

  container.querySelector('#googleLogin').addEventListener('click', (e) => {
    e.preventDefault();
    googleRegister()
    .then(() => onNavigate('/wall'))
    .catch((error) => {
      alert('error ', error);
    });
  });
  
  container.querySelector('#registro').addEventListener('click', (e) => {
    e.preventDefault();
    onNavigate('/register');
  });
  return container;
};
