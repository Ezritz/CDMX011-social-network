import { getUser, verifyUser, signOut } from '../firebaseClient.js';
import { onNavigate } from '../main.js';

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
      <div class="divChild">
        <h2 class="subtitle">Hola ${currentUser ? currentUser.email : ''}</h2> <br>
      </div>
      <main>
      <form method="POST" id="wallForm">
        <input type="text" id="toPost" placeholder="Que deseas publicar hoy?">
        <a href="" id="confirmPost">Publicar</a>
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
  const wallF = document.getElementById('wallForm');

  container.querySelector('#exit').addEventListener('click', (e) => {
    e.preventDefault();
    signOut()
    .then (() => {

    })
    .catch((error) =>{
      alert('Error: ', error.message);
    });
    onNavigate('/');
  });

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
        document.querySelector('#toPost').value = '';
        console.log('Document succesfully written');
      })
      .catch((error) => {
        console.log('Error writing: ', error.message)
      });
    }
  });

  const postContainer = container.querySelector('#postContainer');
  const deleteDataFire = id => db.collection('posts').doc(id).delete();
  collection.onSnapshot((querySnapshot) => {
    postContainer.innerHTML ='';
    querySnapshot.forEach((doc) => {
      const dataFire = doc.data();
      dataFire.id = doc.id;
      console.log(dataFire);
      postContainer.innerHTML += `
      <div id="contPub">
        ${dataFire.post}
        <div>
          <a href="" id="edit">Editar</a>
          <button id="btnDelete" data-id="${dataFire.id}">Borrar</button>
          <label for="like"></label>
          <button id="count">MG</button>
        </div>
      </div>`;

      const butDelete = document.querySelectorAll('#btnDelete');
      butDelete.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          console.log(e.target.dataset.id);
          deleteDataFire(e.target.dataset.id);
        });
      });
    });
  });
  return container;
};
