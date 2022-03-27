import { createStore, applyMiddleware } from 'redux';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { combineReducers, orbit } from 'orbit-redux';
import { appSlice } from './appSlice';


export const store = createStore(
  combineReducers({
    [appSlice.name]: appSlice.reducer,
  }),
  applyMiddleware(orbit)
);

type RootState = ReturnType<typeof store.getState>;
type Dispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => Dispatch = useDispatch;