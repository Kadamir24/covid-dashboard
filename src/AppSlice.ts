import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountry } from './interfaces/appInterfaces';

const appSlice = createSlice({
    name: 'app',
    initialState: {
        countries: [] as ICountry[],
    },
    reducers: {
        setContries(state: { countries: ICountry[] }, action: PayloadAction<ICountry[]>) {
            return {
                countries: action.payload,
            };
        },
    },
});

export const { setContries } = appSlice.actions;
export default appSlice.reducer;
