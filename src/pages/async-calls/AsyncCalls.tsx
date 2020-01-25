import React from 'react';
import styled from 'styled-components';
import { createStore, useStore } from '../../lib/store';

const initialState = {
  loading: false,
  count: 0,
};

const actions = {
  add: async (state: typeof initialState, value: number): Promise<typeof initialState> => {
    store.setState({ loading: true });
    await expensive();
    return {
      count: store.getState().count + value,
      loading: false,
    };
  },
};

const store = createStore(initialState, actions);

export function AsyncCalls() {
  const { state, actions } = useStore(store);
  const { count, loading } = state;
  const { add } = actions;

  return (
    <StyledAsyncCalls>
      <button onClick={() => add(1)}>Very expensive calculation</button>
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
