import { initialState } from './feedsSlice';
import feedsReducer, { fetchFeeds } from './feedsSlice';

export const mockedFeeds = {
  success: true,
  orders: [
    {
      _id: '66c8dd3c119d45001b501b81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-08-23T19:04:28.782Z',
      updatedAt: '2024-08-23T19:04:29.332Z',
      number: 50898
    },
    {
      _id: '66c8c55d119d45001b501b64',
      ingredients: ['643d69a5c3f7b9001cfa093c', '643d69a5c3f7b9001cfa093e'],
      status: 'done',
      name: 'Краторный люминесцентный бургер',
      createdAt: '2024-08-23T17:22:37.284Z',
      updatedAt: '2024-08-23T17:22:37.763Z',
      number: 50897
    }
  ],
  total: 50524,
  totalToday: 146
};
export const mockedError = 'Ошибка получения заказов';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve(mockedFeeds)
    }) as any
);
describe('fetchFeeds', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    // Очистка состояния перед каждым тестом
  });
  test('обработка fetchFeeds.pending', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull;
  });
  test('обработка fetchFeeds.fulfilled', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockedFeeds };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.success).toEqual(mockedFeeds.success);
    expect(state.orders).toEqual(mockedFeeds.orders);
    expect(state.total).toEqual(50524);
    expect(state.totalToday).toEqual(146);
  });
  test('обработка fetchFeeds.rejected', () => {
    const action = { type: fetchFeeds.rejected.type, payload: mockedError };
    const state = feedsReducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toEqual(mockedError);
  });
});
