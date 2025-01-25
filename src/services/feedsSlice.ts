import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { getFeedsApi, TFeedsResponse } from '../utils/burger-api';
import { TOrder } from '@utils-types';
import { RootState } from './store';

interface FeedsState {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
}

const initialState: FeedsState = {
  success: false,
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null
};

export const fetchFeeds = createAsyncThunk(
  'feeds/fetchFeeds',
  async (_, thunkAPI) => {
    try {
      const response = await getFeedsApi();
      return response;
    } catch (error) {
      console.error('Ошибка при получении данных:', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchFeeds.fulfilled,
        (state, action: PayloadAction<TFeedsResponse>) => {
          state.isLoading = false;
          state.success = action.payload.success;
          state.orders = action.payload.orders; // Используем `orders` из `TFeedsResponse`
          state.total = action.payload.total;
          state.totalToday = action.payload.totalToday;
        }
      )
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedsSlice.reducer;

export const selectFeedsState = (state: RootState) => state.feedsSlice;

export const selectAllOrders = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.orders
);

// Селектор для получения total
export const selectTotal = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.total
);

// Селектор для получения totalToday
export const selectTotalToday = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.totalToday
);

export const selectIsLoading = createSelector(
  [selectFeedsState],
  (feedsState) => feedsState.isLoading
);
