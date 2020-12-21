import { combineReducers } from '@reduxjs/toolkit';
import countriesReducer from '../AppSlice';

const rootReducer = combineReducers({
    countries: countriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
