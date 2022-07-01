import currenciesReducer from "../features/Currencies/currenciesSlide";
import selectedSlide from "../features/Selected/selectedSlide";
import convertedSlide from "../features/Convert/convertSlide";
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    currency: selectedSlide,
    converted: convertedSlide
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})