import React from "react"
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import '@testing-library/jest-dom/extend-expect'
import { screen, render, cleanup, fireEvent, waitFor, } from '@testing-library/react';
import { Login } from './login';
import { store } from '../state/store';
import axiosMock from 'axios';

afterEach(cleanup);

function renderWithRedux(component: JSX.Element) {

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store: store,
  };
}

it('initialize login component', () => {
  const { getByPlaceholderText } = renderWithRedux(<Login />);

  expect(getByPlaceholderText('Email Address')).toBeInTheDocument();
  expect(getByPlaceholderText('Password')).toBeInTheDocument();

});

it('checks email and pass are required', () => {
  const { getByText } = renderWithRedux(<Login />);

  fireEvent.click(getByText('LOG IN'));
  expect(getByText('Email is required.')).toBeInTheDocument();
  expect(getByText('Password is required.')).toBeInTheDocument();
});

it('checks login failed', async () => {
  const { getByText, getByPlaceholderText, store } = renderWithRedux(<Login />);
  //axiosMock.get.mockRejectedValue({message: 'login failed'});
  fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'jasim' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'wrong' } });
  fireEvent.click(getByText('LOG IN'));

  await waitFor(() => {
    expect(store.getState().app.error).toBe("Request failed with status code 401");
  });
});

it('checks login successfull', async () => {
  const { getByText, getByPlaceholderText, store } = renderWithRedux(<Login />);

  fireEvent.change(getByPlaceholderText('Email Address'), { target: { value: 'jasim@gmail.com' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'meld123' } });
  fireEvent.click(getByText('LOG IN'));

  await waitFor(() => {
    expect(store.getState().app.isLogedIn).toBe(true);
  });
});



