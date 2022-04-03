import { api } from './../api/api';
import axios from 'axios';
import { createSlice, PayloadAction } from 'orbit-redux';

export interface Login {
  email: string;
  pasword: string;
}
export interface Device {
  id: string;
  name: string;
}
export interface Notify {
  name: string;
  email: string;
  repoUrl: string;
  message: string;
}
export const appSlice = createSlice({
  name: 'app',
  initialState: {
    isLogedIn: false,
    loading: false,
    error: '',
    devices: [] as Device[],
    message: '',
  },
  reducers: {
    login(state) {
      return { ...state, isLogedIn: true, loading: false, error: '' };
    },
    logout(state) {
      return { ...state, isLogedIn: false };
    },
    loading(state) {
      return { ...state, loading: true };
    },
    setDevicesData(state, action: PayloadAction<Device[]>) {
      return { ...state, loading: false, devices: action.payload };
    },
    setMessage(state, action: PayloadAction<string>) {
      return { ...state, loading: false, message: action.payload };
    },
    setError(state, action: PayloadAction<string>) {
      return { ...state, loading: false, error: action.payload };
    },
  },

  effects: {
    async loginEffect(dispatch, _, action: PayloadAction<Login>) {
      dispatch(loading());
      try {
        const res = await api.login(action.payload);
        localStorage.setItem('token', res);
        dispatch(login());
        setToken(`Bearer ${localStorage.getItem('token')}`);
      } catch (error: any) {
        dispatch(setError(error.message));
        dispatch(clearMessage());
      }
    },
    async deviceEffect(dispatch) {
      dispatch(loading());
      try {
        const res = await api.getDeviceData();
        dispatch(setDevicesData(res.devices));
      } catch (error: any) {
        dispatch(setError(error.message));
      }
    },
    logoutEfect(dispatch) {
      localStorage.removeItem('token');
      dispatch(logout());
      setToken('');
    },
    async notifyEffect(dispatch) {
      dispatch(loading());
      try {
        const res = await api.notify({
          email: 'jasim.uddin.khan@gmail.com',
          name: 'Jasim Khan',
          repoUrl: 'https://github.com/JUkhan/fuzzy-fiesta',
          message:
            'Hi, I am Jasim Khan. I am using Fuzzy Fiesta to notify you about new updates.',
        });
        dispatch(setMessage(res));
        dispatch(clearMessage());
      } catch (error: any) {
        dispatch(setError(error.message));
        dispatch(clearMessage());
      }
    },
    clearMessage(dispatch) {
      setTimeout(() => {
        dispatch(setMessage(''));
        dispatch(setError(''));
      }, 3000);
    },
    init(dispatch) {
      if (localStorage.getItem('token')) {
        dispatch(login());
        setToken(`Bearer ${localStorage.getItem('token')}`);
      }
    },
  },
});

function setToken(token: string) {
  axios.defaults.headers.common['Authorization'] = token;
}

export const {
  login,
  logout,
  loading,
  loginEffect,
  deviceEffect,
  logoutEfect,
  init,
  clearMessage,
  notifyEffect,
  setMessage,
  setDevicesData,
  setError,
} = appSlice.actions;
