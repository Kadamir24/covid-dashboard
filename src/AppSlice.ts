import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountry } from './interfaces/appInterfaces';

interface IAppState {
    countries: ICountry[]
}

const initialState: IAppState = {
    countries: [],
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setContries(state: IAppState, action: PayloadAction<ICountry[]>) {
            const copyState = { ...state };
            copyState.countries = action.payload;
            return copyState;
        },
    },
});

export const { setContries } = appSlice.actions;
export default appSlice.reducer;
