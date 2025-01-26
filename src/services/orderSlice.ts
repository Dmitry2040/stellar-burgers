import {
  createAsyncThunk,
  createSelector,
  createSlice
} from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState, useDispatch, useSelector } from './store';
import { clearConstructor } from './constructorSlice';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi,
  TNewOrderResponse
} from '../utils/burger-api';

interface IOrderSliceState {
  success: boolean;
  order: TOrder | null;
  profileOrders: TOrder[] | null;
  name: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrderSliceState = {
  success: false,
  order: null,
  profileOrders: null,
  name: null,
  isLoading: false,
  error: null
};

export const fetchOrderDetails = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderNumber: number, thunkAPI) => {
    const response = await getOrderByNumberApi(orderNumber);
    const order = response.orders.find((order) => order.number === orderNumber);
    if (!order) {
      return thunkAPI.rejectWithValue('Order not found');
    }
    return order;
  }
);

export const fetchOrderRequest = createAsyncThunk<TNewOrderResponse, string[]>(
  'order/fetchOrderRequest',
  async (data: string[], thunkAPI) => {
    const response = await orderBurgerApi(data);
    console.log(response);
    return response;
  }
);

export const fetchOrdersProfile = createAsyncThunk(
  'order/fetchOrdersProfile',
  async (_, thunkAPI) => {
    const response = await getOrdersApi();
    return response;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrderModal: (state) => {
      state.order = null;
      state.success = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrderRequest.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrderRequest.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.order = action.payload.order;
        state.name = action.payload.name;
        console.log(`номер вашего заказа: ${state.order.number}`);
      })
      .addCase(fetchOrderRequest.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload as string;
      })
      .addCase(fetchOrdersProfile.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOrdersProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.profileOrders = action.payload;
      })
      .addCase(fetchOrdersProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  }
});

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (data: number) => await getOrderByNumberApi(data)
);

export default orderSlice.reducer;

export const selectOrderSlice = (state: RootState) => state.orderSlice;

export const orderSelect = createSelector(
  selectOrderSlice,
  (state) => state.order
);
export const ordersProfile = (state: RootState): TOrder[] =>
  state.orderSlice.profileOrders ?? [];

export const { resetOrderModal } = orderSlice.actions;
