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
    <img id="logoWall" src="./sweatshirt.png">
    <h2 class="titleWall">Trueque</h2>
    <a href="" id="exit">Cerrar Sesion</a>
    </header>
    <div class="father">
      <h2 class="subtitle">Hola ${currentUser ? currentUser.email : ''}</h2> <br>
      <form method="POST" id="wallForm">
      <div id="toPostContainer">
        <input type="text" id="toPost" placeholder="Que deseas publicar hoy?">
        <a href="" id="confirmPost">Publicar</a>
      </div>
      </form>
      <div id="postContainer"></div>
      
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
  // const wallF = document.getElementById('wallForm');

  // SIGN OUT
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

  // FIREBASE CONNECT
  container.querySelector('#confirmPost').addEventListener('click', (e) => { //SEND POST TO FIREBASE
    e.preventDefault();
    const post = document.querySelector('#toPost').value;
    const likes = 0;
    const alikes = [];
    if(post === ''){
      // document.getElementById('confirmPost').disabled = true;
      alert('No se permiten espacios vacíos');
    }
    else{
      collection.add({
        post,
        likes,
        alikes,
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

  collection.onSnapshot((querySnapshot) => { // PULL POST AND ADD IN REAL TIME
    postContainer.innerHTML ='';
    querySnapshot.forEach((doc) => {
      const dataFire = doc.data();
      
      dataFire.id = doc.id;
      console.log(dataFire);
      console.log("alikes: ",dataFire.alikes.length);
      postContainer.innerHTML += `
      <div id="contPub">
        ${dataFire.post}
        <div id="btnsContenedor">
          <a href="" id="edit" class="links" data-id='${dataFire.id}'>Editar</a>
          <img id="btnDelete" src="./eliminar.png" data-id='${dataFire.id}'>
          <div class="likes">
            <img id="like" src="./corazon.png" data-id='${dataFire.id}'>
            <span id="counter">${dataFire.alikes.length}</span>
          </div>
        </div>
      </div>
      
      <div id="modalWindow">
        <div id="modalContainer">
          <div id="closeModal">
            <span class="close" id="closeX">&times;</span>
          </div>
          <input type="text" id="editInput">
          <button id="editBtnPost" data-id='${dataFire.id}'>Editar</button>
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

      document.querySelectorAll('#like').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          console.log('like');
          const target = e.target;
          // const alikes = dataFire.alikes;
          
          let docRef = collection.doc(target.dataset.id);
          docRef.get().then((doc) => {
            console.log('doc alikes; ', doc.data().alikes);
            if (!doc.data().alikes.includes(currentUser.email)){

              docRef
              .update({
                alikes: firebase.firestore.FieldValue.arrayUnion(currentUser.email),
              });
              console.log('+1 like');
            }
            else {
              docRef
              .update({
                alikes: firebase.firestore.FieldValue.arrayRemove(currentUser.email),
              });
            }
          })
          
        });
      });
      // Post Edit
      document.querySelectorAll('#edit').forEach((btnE) => {
        btnE.addEventListener('click', (e) => {
          e.preventDefault();
          document.getElementById('modalWindow').style.display ='block';

          const target = e.target;
          collection.doc(target.dataset.id)
            .get()
            //eslint-disable-next-line no-shadow
            .then((doc) => {
              const dataEdit = doc.data();
              document.getElementById('editInput').value = dataEdit.post;
            })
            .catch((error) => {
              console.log('error getting document: ',error.message);
            });
          document.getElementById('editBtnPost').addEventListener('click',() => {
            //eslint-disable-next-line no-shadow
            const target = e.target;
            const post = document.querySelector('#editInput').value;

            collection.doc(target.dataset.id)
              .update({
                post,
              })
              .then (() =>{
                console.log('Document succesfully Updated');
              })
              .catch((error) => {
                console.log('Error updating document: ',error.message);
              });
          });

          document.getElementById('closeX').addEventListener('click', () =>{
            document.getElementById('modalWindow').style.display = 'none';
          });
        });
      });
    });
  });
  return container;
};
