import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICountry } from './interfaces/appInterfaces';

interface IAppState {
    countries: ICountry[],
    selectedCountry: string | null,
    isLastDaySelected: boolean,
    is100KPopSelected: boolean
}

const initialState: IAppState = {
    countries: [],
    selectedCountry: null,
    isLastDaySelected: false,
    is100KPopSelected: false,
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
        setSelectedCountry(state: IAppState, action: PayloadAction<string | null>) {
            const copyState = { ...state };
            copyState.selectedCountry = action.payload;
            return copyState;
        },
        setIsLastDaySelected(state: IAppState, action: PayloadAction<boolean>) {
            const copyState = { ...state };
            copyState.isLastDaySelected = action.payload;
            return copyState;
        },
        setIs100KPopSelected(state: IAppState, action: PayloadAction<boolean>) {
            const copyState = { ...state };
            copyState.is100KPopSelected = action.payload;
            return copyState;
        },
    },
});

export const {
    setContries,
    setSelectedCountry,
    setIsLastDaySelected,
    setIs100KPopSelected,
} = appSlice.actions;
export default appSlice.reducer;
