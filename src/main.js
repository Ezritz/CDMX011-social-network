import { Home } from './components/Home.js';
import { Register } from './components/Register.js';
import { Login } from './components/Login.js';

const rootDiv = document.getElementById('root');

// Routes
const routes = {
  '/': Home,
  '/register': Register,
  '/login': Login,
};

export const onNavigate = (pathname) => { // esta funcion es para activar el evento click
  window.history.pushState(
    {}, // lo que contiene el estado
    pathname,
    window.location.origin + pathname,
  );
  while (rootDiv.firstChild) {
    rootDiv.removeChild(rootDiv.firstChild);
  }

  rootDiv.appendChild(routes[pathname]());
  registerButtons(pathname);
};

const registerButtons = (pathname) => {
  switch (pathname) {
    case '/register':
      console.log('registro');
      document.getElementById('is').addEventListener('click', () => onNavigate('/'));
      document.getElementById('registro').addEventListener('click', () => onNavigate('/register'));
      break;
    default:
      console.log('default');
      document.getElementById('registro').addEventListener('click', () => onNavigate('/register'));
      document.getElementById('is').addEventListener('click', () => onNavigate('/login'));
      break;
  }
};

const component = routes[window.location.pathname];
window.onpopstate = () => {
  rootDiv.appendChild(component());
};

rootDiv.appendChild(component());
registerButtons(window.location.pathname);

// myFunction();
