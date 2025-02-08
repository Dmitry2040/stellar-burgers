import { initialState } from './ingredientSlice';
import ingredientReducer, { fetchAllIngredients } from './ingredientSlice';

export const mockedIngredients = [
  {
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
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  },
  {
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
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];
export const mockedError = 'Ошибка получения ингредиентов';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockedIngredients)
    }) as any
);
describe('ingredientSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Очистка состояния перед каждым тестом
  });
  test('обработка ingredientSlice.pending', () => {
    const action = { type: fetchAllIngredients.pending.type };
    const state = ingredientReducer(initialState, action);
    // Проверка статуса и ошибки
    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });
  test('обработка ingredientSlice.fulfilled', () => {
    const action = {
      type: fetchAllIngredients.fulfilled.type,
      payload: mockedIngredients
    };
    const state = ingredientReducer(initialState, action);
    expect(state.status).toBe('succeeded');
    expect(state.items).toEqual(mockedIngredients);
  });
  test('обработка ingredientSlice.rejected', () => {
    const action = {
      type: fetchAllIngredients.rejected.type,
      payload: mockedError
    };
    const state = ingredientReducer(initialState, action);
    expect(state.status).toBe('failed');
    expect(state.error).toEqual(mockedError);
  });
});
