import { combineReducers } from '@reduxjs/toolkit';
import appStateReducer from '../AppSlice';

const rootReducer = combineReducers({
    appState: appStateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
