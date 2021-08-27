export const Register = () => {
  const HomeDiv = document.createElement('div');
  const HomeForm = document.createElement('form');
  // HomeDiv.textContent = 'Registro';
  const aHome = document.createElement('a');
  const buttonRegister = document.createElement('button');
  const frase2 = document.createElement('p');
  const inputEmail = document.createElement('input');
  const inputPassword = document.createElement('input');

  inputEmail.type = 'email';
  inputEmail.id = 'email';
  inputEmail.placeholder = 'alguien@example.com';
  inputPassword.type = 'password';
  inputPassword.id = 'password';
  inputPassword.placeholder = 'Contraseña';
  buttonRegister.textContent = 'Registrate';
  buttonRegister.id = 'registro';
  buttonRegister.className = 'button';
  aHome.textContent = 'Inicia Sesión';
  aHome.className = 'frase';
  aHome.id = 'is';
  frase2.textContent = '¿Tienes una cuenta? ';
  frase2.className = 'frase';

  HomeDiv.appendChild(inputEmail);
  HomeDiv.appendChild(inputPassword);
  HomeDiv.appendChild(buttonRegister);
  HomeDiv.appendChild(frase2);
  HomeDiv.appendChild(aHome);
  HomeForm.appendChild(HomeDiv);

  return HomeForm;
};
