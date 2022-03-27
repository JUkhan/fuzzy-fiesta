import axios from 'axios';
import { Login, Notify, Device } from './../state/appSlice';

const baseUrl = 'http://35.201.2.209:8000/';

export const api = {
  login: (login: Login) =>
    axios.post(baseUrl + 'login', login).then((res) => res.data),
  getDeviceData: () => axios.get(baseUrl + 'devices').then((res) => res.data as {devices:Device[]}),
  notify: (data: Notify) =>
    axios.post(baseUrl + 'notify', data).then((res) => res.data),
};
