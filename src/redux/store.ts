import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";

import dogListReducer from './Reducer/dogListReducer'

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const rootReducer = combineReducers({
    DogData: dogListReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    })
});

export let persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>

export default store;
