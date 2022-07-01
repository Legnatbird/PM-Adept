import { configureStore } from '@reduxjs/toolkit';
import currenciesReducer from "../features/Currencies/currenciesSlide";
import historicalSlide from "../features/Historical/historicalSlide";
import convertedSlide from "../features/Convert/convertSlide";
import selectedSlide from "../features/Selected/selectedSlide";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
    currency: selectedSlide,
    converted: convertedSlide,
    historical: historicalSlide
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
})