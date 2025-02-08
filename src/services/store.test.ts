import constructorReducer from './constructorSlice';
import feedsSlice from './feedsSlice';
import ingredientsReducer from './ingredientSlice';
import orderSlice from './orderSlice';
import userSlice from './userSlice';
import { rootReducer } from './store';

describe('rootReducer', () => {
  it('should initialize with the correct state', () => {
    const initialState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    // Ожидаемое начальное состояние, которое объединяет начальные состояния всех редюсеров
    const expectedState = {
      ingredientsSlice: ingredientsReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      constructorSlice: constructorReducer(undefined, {
        type: 'UNKNOWN_ACTION'
      }),
      feedsSlice: feedsSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      orderSlice: orderSlice(undefined, { type: 'UNKNOWN_ACTION' }),
      userSlice: userSlice(undefined, { type: 'UNKNOWN_ACTION' })
    };
    expect(initialState).toEqual(expectedState);
  });
});
