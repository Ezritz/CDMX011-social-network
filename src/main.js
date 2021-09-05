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


firebase.auth().onAuthStateChanged((user) => {
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

const dispatchRoute = (pathname = '/') => {
  const root = document.getElementById('root');
  const component = routes[pathname];
  render(root, component());
};

/* window.addEventListener('load', () => {
  dispatchRoute(window.location.pathname);
});*/

export const onNavigate = (pathname) => { // esta funcion es para activar el evento click
  window.history.pushState({}, pathname, window.location.origin + pathname);
  dispatchRoute(pathname);
};

window.addEventListener('popstate', () => {
  dispatchRoute(window.location.pathname);
});
