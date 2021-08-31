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
  
  return container;
};
