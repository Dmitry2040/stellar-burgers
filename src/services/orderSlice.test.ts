import { initialState } from './orderSlice';
import orderReducer, {
  fetchOrderDetails,
  fetchOrderRequest,
  fetchOrdersProfile
} from './orderSlice';
import { TNewOrderResponse } from '../utils/burger-api';

export const mockedOrderDetails = {
  orders: [
    {
      _id: '66c8dd3c119d45001b501b81',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
      status: 'done',
      name: 'Флюоресцентный био-марсианский бургер',
      createdAt: '2024-08-23T19:04:28.782Z',
      updatedAt: '2024-08-23T19:04:29.332Z',
      number: 50898
    }
  ]
};
export const mockedOrderResponse: TNewOrderResponse = {
  success: true,
  order: {
    _id: '66c8dd3c119d45001b501b81',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0941'],
    status: 'done',
    name: 'Флюоресцентный био-марсианский бургер',
    createdAt: '2024-08-23T19:04:28.782Z',
    updatedAt: '2024-08-23T19:04:29.332Z',
    number: 50898
  },
  name: 'Флюоресцентный био-марсианский бургер'
};
export const mockedProfileOrders = [
  {
    _id: '66c9ad8d119d45001b501c39',
    ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093e'],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2024-08-24T09:53:17.799Z',
    updatedAt: '2024-08-24T09:53:18.298Z',
    number: 50935
  },
  {
    _id: '66c9ac9d119d45001b501c33',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0945',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный spicy антарианский бургер',
    createdAt: '2024-08-24T09:49:17.804Z',
    updatedAt: '2024-08-24T09:49:18.319Z',
    number: 50934
  }
];
export const mockedError = 'Order not found';

jest.spyOn(global, 'fetch').mockImplementation(
  () =>
    Promise.resolve({
      json: () => Promise.resolve()
    }) as any
);
describe('orderSlice', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  describe('fetchOrderDetails', () => {
    test('обработка fetchOrderDetails.pending', () => {
      const action = { type: fetchOrderDetails.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrderDetails.fulfilled', async () => {
      const action = {
        type: fetchOrderDetails.fulfilled.type,
        payload: mockedOrderDetails.orders[0]
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.order).toEqual(mockedOrderDetails.orders[0]);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrderDetails.rejected', () => {
      const action = {
        type: fetchOrderDetails.rejected.type,
        payload: mockedError
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toEqual(mockedError);
      expect(state.success).toBe(false);
    });
  });
  describe('fetchOrderRequest', () => {
    test('обработка fetchOrderRequest.pending', () => {
      const action = { type: fetchOrderRequest.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrderRequest.fulfilled', () => {
      const action = {
        type: fetchOrderRequest.fulfilled.type,
        payload: mockedOrderResponse
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.order).toEqual(mockedOrderResponse.order);
      expect(state.name).toBe(mockedOrderResponse.name);
    });
    test('обработка fetchOrderRequest.rejected', () => {
      const action = {
        type: fetchOrderRequest.rejected.type,
        payload: mockedError
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toEqual(mockedError);
    });
  });
  describe('fetchOrdersProfile', () => {
    test('обработка fetchOrdersProfile.pending', () => {
      const action = { type: fetchOrdersProfile.pending.type };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });
    test('обработка fetchOrdersProfile.fulfilled', () => {
      const action = {
        type: fetchOrdersProfile.fulfilled.type,
        payload: mockedProfileOrders
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(true);
      expect(state.profileOrders).toEqual(mockedProfileOrders);
    });
    test('обработка fetchOrdersProfile.rejected', () => {
      const action = {
        type: fetchOrdersProfile.rejected.type,
        payload: mockedError
      };
      const state = orderReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.success).toBe(false);
      expect(state.error).toEqual(mockedError);
    });
  });
});
