import React from 'react';
import styled from 'styled-components';
import { createStore, useStore } from '../../state/store';

const initialState = {
  loading: false,
  count: 0,
};

type State = typeof initialState;

const actions = {
  start: async () => {
    store.setState({ loading: true });
    await expensive();
    return {
      count: store.getState().count + 1,
      loading: false,
    };
  },
};

const store = createStore(initialState, actions as any);

export function AsyncCalls() {
  const { state, actions } = useStore(store);
  const { count, loading } = state;
  const { start } = actions;

  return (
    <StyledAsyncCalls>
      <span>{loading ? 'Loading...' : `Value: ${count}`}</span>
      <Button onClick={start}>Very expensive task</Button>
    </StyledAsyncCalls>
  );
}

async function expensive() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 200);
  });
}

const StyledAsyncCalls = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  margin: 16px;
  padding: 16px;
  font-size: 14px;
  background-color: #cccccc;
  border-radius: 99px;
`;
