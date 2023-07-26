import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../feature/expense/expenseSlice'
export const store = configureStore({
  reducer: {
    expense: counterReducer,
  },
})
