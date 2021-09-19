/**
 * @jest-environment jsdom
 */
import './globals/firebase';
import { Login } from '../src/components/Login';
import { render } from '../src/rend.js';
import { Register } from '../src/components/Register';
import { Home } from '../src/components/Home';

/* eslint-disable no-console */

describe('Login', () => {
  document.body.innerHTML = '<div id="root"></div>';
  test('should render', () => {
    const rootDiv = document.getElementById('root');
    const component = Login();
    render(rootDiv, component);

    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
  test('should login user with submit', () => {
    const mockLogin = jest.fn();
    mockLogin.mockImplementation(() => Promise.resolve());

    firebase.auth = jest.fn().mockImplementation(() => ({
      signInWithEmailAndPassword: mockLogin,
    }));
    const rootDiv = document.getElementById('root');
    const component = Login();
    render(rootDiv, component);

    const email = 'test@email.com';
    const password = '123456';

    document.getElementById('userEmail').value = email;
    document.getElementById('userPassword').value = password;

    document.getElementById('login').click();

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });
});

describe('Register', () => {
  document.body.innerHTML = '<div id="root"></div>';

  test('should render', () => {
    const rootDiv = document.getElementById('root');
    const component = Register();
    render(rootDiv, component);

    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
  test('create user', () => {
    const mockLogin = jest.fn();
    mockLogin.mockImplementation(() => Promise.resolve());

    firebase.auth = jest.fn().mockImplementation(() => ({
      createUserWithEmailAndPassword: mockLogin,
    }));
    const rootDiv = document.getElementById('root');
    const component = Register();
    render(rootDiv, component);

    const email = 'test@email.com';
    const password = '123456';

    document.getElementById('userEmail').value = email;
    document.getElementById('userPassword').value = password;

    document.getElementById('registro').click();

    expect(mockLogin).toHaveBeenCalledWith(email, password);
  });
});

describe('Home', () => {
  document.body.innerHTML = '<div id="root"></div>';

  test('should render', () => {
    const rootDiv = document.getElementById('root');
    const component = Home();
    render(rootDiv, component);

    expect(rootDiv.innerHTML).toMatchSnapshot();
  });
});
