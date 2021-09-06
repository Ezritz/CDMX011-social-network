import { getUser, verifyUser } from '../firebaseClient.js';

const db = firebase.firestore();
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
    <div class="father">
    <h2>Hola ${currentUser ? currentUser.email : ''}</h2> <br>
    <main>
    <form method="POST" id="wallForm">
      <input type="text" id="toPost" placeholder="Que deseas publicar hoy?" autofocus>
      <button id="confirmPost">Publicar</button>
      <input type="text" id="publication">
      <a href="" id="edit">Editar</a>
      <button>Borrar</button>
      <label for="like"></label>
      <button>MG</button>
    </form>
    <div id="postContainer"></div>
    </main>
    </div>`;
  }
  else {
    verifyUser(currentUser);
    html = `
    <p>Please verify your email in your email account</p>
    `;
  }
  container.innerHTML = html;

  const collection = db.collection('posts');

  container.querySelector('#confirmPost').addEventListener('click', (e) => {
    e.preventDefault();
    const post = document.querySelector('#toPost').value;
    if(post === ''){
      // document.getElementById('confirmPost').disabled = true;
      alert('No se permiten espacios vacíos');
    }
    else{
      collection.add({
        post,
      })
      .then(() => {
        console.log('Document succesfully written');
      })
      .catch((error) => {
        console.log('Error writing: ', error.message)
      });
    }
  });
  
  return container;
};
