
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type Language = 'en' | 'ru' | 'az';

interface LanguageState {
    currentLanguage: Language;
}

const initialState: LanguageState = {
    currentLanguage: 'en',
};

const languageSlice = createSlice({
    name: 'language',
    initialState,
    reducers: {
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.currentLanguage = action.payload;
        },
    },
});

export const { setLanguage } = languageSlice.actions;

export const selectCurrentLanguage = (state: { language: LanguageState }) => 
    state.language.currentLanguage;

export default languageSlice.reducer;