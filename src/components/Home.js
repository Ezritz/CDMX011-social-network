export const Home = () => {
  const HomeDiv = document.createElement('div');
  const HomeForm = document.createElement('form');

  const buttonRegister = document.createElement('a');
  const frase1 = document.createElement('p');
  const buttonLogin = document.createElement('button');
  const buttonGoogle = document.createElement('button');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');

  inputEmail.type = 'email';
  inputEmail.id = 'userEmail';
  inputEmail.placeholder = 'alguien@example.com';
  inputPassword.type = 'password';
  inputPassword.id = 'userPassword';
  inputPassword.placeholder = 'Contraseña';
  buttonRegister.textContent = 'Registrate';
  buttonRegister.id = 'registro';
  buttonLogin.textContent = 'Inicia Sesión';
  buttonLogin.id = 'is';
  buttonGoogle.textContent = 'Iniciar Sesión con Google';
  buttonGoogle.id = 'googleLogin';
  frase1.textContent = '¿No tienes una cuenta? ';
  frase1.className = 'frase';

  // Firebase
  const signinform = document.querySelector('#signIn');
  const auth = firebase.auth();
  buttonLogin.addEventListener('click', (e) => {
    e.preventDefault();

    const email = inputEmail.value;
    const password = inputPassword.value;
    console.log(email, password);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredencial) => {
        signinform.reset();
        console.log('signin ', userCredencial);
      })
      .catch((error) => {
        alert('error: ', error.message);
      });
  });

  // ingreso con Google
  buttonGoogle.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log('google sign in', result);
      })
      .catch((error) => {
        console.log('error ', error);
      });
  });

  HomeDiv.appendChild(inputEmail);
  HomeDiv.appendChild(inputPassword);
  HomeDiv.appendChild(buttonLogin);
  HomeDiv.appendChild(buttonGoogle);
  HomeDiv.appendChild(frase1);
  HomeDiv.appendChild(buttonRegister);
  HomeForm.appendChild(HomeDiv);

  return HomeForm;
};
