/**
 * @jest-environment jsdom
 */
import { Home } from '../src/components/Home.js';

describe('coleccion de test sobre el DOM', () => {
  it('test de Home', () => {
    const ruteado = Home();
    console.log(ruteado);
  });
});
