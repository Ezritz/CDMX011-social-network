import { Home } from './components/Home.js';
import { render } from './rend.js';
import { Login } from './components/Login.js';
import { Register } from './components/Register.js';
// eslint-disable-next-line import/no-cycle
// Routes
const routes = {
  '/wall': Home,
  '/': Login,
  '/register': Register,
};

const basePath = '/CDMX011-social-network';

const dispatchRoute = (pathname = '/') => {
  const root = document.getElementById('root');
  const component = routes[pathname];
  render(root, component());
};

/* window.addEventListener('load', () => {
  console.log('dispatch');
  dispatchRoute(window.location.pathname);
});*/

export const onNavigate = (pathname) => { // esta funcion es para activar el evento click
  console.log(window.location.origin + basePath + pathname);
  window.history.pushState({}, pathname, window.location.origin + basePath + pathname);
  dispatchRoute(basePath+pathname);
};

// Mantener la sesión activa
firebase.auth().onAuthStateChanged((user) => {
  console.log('1');
  console.log('pathname', pathname);
  let pathname = window.location.pathname;
  if (user) {
    if (pathname === '/' || pathname === '/register') {
      pathname = '/wall';
    }
  }else{
    pathname = '/';
  }
  onNavigate(pathname);
});

window.addEventListener('popstate', () => {
  dispatchRoute(window.location.pathname);
});
