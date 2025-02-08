import reducer, {
  addIngredient,
  removeIngredient,
  moveIngredient,
  setBun,
  clearConstructor,
  initialState
} from './constructorSlice';
import { TConstructorIngredient } from '../utils/types';

export const ingredientTypeBun: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa093c',
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};
export const ingredientTypeMain: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa0941',
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
};
export const ingredientTypeSauce: TConstructorIngredient = {
  id: '643d69a5c3f7b9001cfa0942',
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};

describe('constructorSlice', () => {
  test('обработка setBun', () => {
    const newState = reducer(initialState, setBun(ingredientTypeBun));
    expect(newState).toEqual({
      bun: ingredientTypeBun,
      ingredients: []
    });
  });
  test('обработка addIngredient;', () => {
    // Добавление ингредиента
    const newState = reducer(initialState, addIngredient(ingredientTypeMain));
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeMain]
    });
  });
  test('обработка removeIngredient', () => {
    // Состояние с несколькими ингредиентами
    const state = {
      bun: null,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };
    // Удаление ингредиента по id
    const newState = reducer(
      state,
      removeIngredient('643d69a5c3f7b9001cfa0941')
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeSauce]
    });
  });
  test('обработка moveIngredient', () => {
    // Состояние с несколькими ингредиентами
    const state = {
      bun: null,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };
    // Перемещение ингредиента
    const newState = reducer(
      state,
      moveIngredient({ id: '643d69a5c3f7b9001cfa0942', option: 'up' })
    );
    expect(newState).toEqual({
      bun: null,
      ingredients: [ingredientTypeSauce, ingredientTypeMain]
    });
  });
  test('обработка clearConstructor', () => {
    const state = {
      bun: ingredientTypeBun,
      ingredients: [ingredientTypeMain, ingredientTypeSauce]
    };
    const newState = reducer(state, clearConstructor());
    expect(newState).toEqual(initialState);
  });
});
