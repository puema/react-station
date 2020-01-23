import React from 'react';
import styled from 'styled-components';
import { createStore, useStore } from '../../lib/store';

const initialState = {
  loading: false,
  count: 0,
};

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
      <button onClick={start}>Very expensive calculation</button>
      <span>{loading ? `Calculating ${count} + 1...` : `Value: ${count}`}</span>
    </StyledAsyncCalls>
  );
}

async function expensive() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 600);
  });
}

const StyledAsyncCalls = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
