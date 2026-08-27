import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth-slice';

// Load state from localStorage
const loadState = () => {
	try {
		const serializedState = localStorage.getItem('auth');
		if (serializedState === null) return undefined;
		return { auth: JSON.parse(serializedState) };
	} catch {
		return undefined;
	}
};

// Save state to localStorage
const saveState = (state: { auth: ReturnType<typeof authReducer> }) => {
	try {
		const serializedState = JSON.stringify(state.auth);
		localStorage.setItem('auth', serializedState);
	} catch {
		// Ignore
	}
};

const persistedState = loadState();

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	preloadedState: persistedState,
});

// Subscribe to store changes and save to localStorage
store.subscribe(() => {
	saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
