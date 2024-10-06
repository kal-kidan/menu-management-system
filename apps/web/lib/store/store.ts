import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import menuReducer from './menuSlice';

const store = configureStore({
    reducer: {
        menu: menuReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
