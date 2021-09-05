import { getUser, verifyUser } from '../firebaseClient.js';

export const Home = () => {
  const currentUser = getUser();
  console.log('u: ', currentUser);
  const container = document.createElement('div');
  let html;
  
  
  if (currentUser.emailVerified) {
    html = `
    <header id="headerWall">
    <a href="" id="exit">Cerrar Sesion</a>
    </header>
    <h2>Hola ${currentUser ? currentUser.email : ''}</h2> <br>
    <main>
    <form method="POST" id="signIn">
      <input type="text" id="toPost" placeholder="Que deseas publicar hoy?">
      <button id="confirmPost">Publicar</button>
      <div>
        <input type="text" id="publication">
        <a href="" id="edit">Editar</a>
        <button>Borrar</button>
        <label for="like"></label>
        <button>MG</button>
      </div>
    </form>
    </main>
    `;
  }
  else {
    verifyUser(currentUser);
    html = `
    <p>Please verify your email in your email account</p>
    `;
  }
  container.innerHTML = html;
  return container;
};
