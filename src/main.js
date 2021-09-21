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

const dispatchRoute = (pathname = '/') => {
  const root = document.getElementById('root');
  const component = routes[pathname];
  render(root, component());
};

export const onNavigate = (pathname) => { // esta funcion es para activar el evento click
  window.history.pushState({}, pathname, window.location.origin + pathname);
  dispatchRoute(pathname);
};

// Mantener la sesión activa
firebase.auth().onAuthStateChanged((user) => {
  console.log('1');
  let pathname = window.location.pathname;
  if (user) {
    if (pathname === '/' || pathname === '/register') {
      pathname = '/wall';
    }
  } else {
    pathname = '/';
  }
  onNavigate(pathname);
});

window.addEventListener('popstate', () => {
  dispatchRoute(window.location.pathname);
  console.log('aquipop');
});
