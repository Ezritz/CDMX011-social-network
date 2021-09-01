/**
 * @jest-environment jsdom
 */
import './globals/firebase';
import { render } from '../src/rend.js';
import { Login } from '../src/components/Login';

describe('Login', () => {
  document.body.innerHTML = '<div id="root"></div>';
  it('should render', () => {
    const rootDiv = document.getElementById('root');
    const component = Login();
    render(rootDiv, component);

    console.log(rootDiv.innerHTML);
  });
});
