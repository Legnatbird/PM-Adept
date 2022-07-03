import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from "../features/Currencies/currenciesSlide";
import convertedReducer from "../features/Convert/convertSlide";
import selectedReducer from "../features/Selected/selectedSlide";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    currency: selectedReducer,
    converted: convertedReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})