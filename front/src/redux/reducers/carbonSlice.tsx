import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CarbonRecord {
  _id: string;
  date: string;      // ISO
  amount: number;    // + 절감, - 증가 (g CO₂)
  desc: string;
  category?: string;
}

interface CarbonState {
  monthRecords: CarbonRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: CarbonState = {
  monthRecords: [],
  loading: false,
  error: null,
};

const carbonSlice = createSlice({
  name: 'carbon',
  initialState,
  reducers: {
    requestMonth(state) {
      state.loading = true;
      state.error = null;
    },
    monthSuccess(state, action: PayloadAction<CarbonRecord[]>) {
      state.loading = false;
      state.monthRecords = action.payload;
    },
    monthFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { requestMonth, monthSuccess, monthFailure } = carbonSlice.actions;
export default carbonSlice.reducer;
