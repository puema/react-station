import React, { useEffect } from 'react';
import styled from 'styled-components';
import { createStore, Store, useStore } from '../../lib';

const initialState = {
  loading: false,
  count: 0,
};

type State = typeof initialState;

type Actions = {
  add(state: State, value: number): Promise<State>;
  load(state: State): Partial<State>;
};

const actions = ({ getActions }: Store<State, Actions>) => ({
  async add(state: State, value: number): Promise<State> {
    getActions().load();
    await expensive();
    return {
      count: state.count + value,
      loading: false,
    };
  },

  load() {
    return { loading: true };
  },
});

const store = createStore(initialState, actions);

export function AsyncCalls() {
  const { state, actions } = useStore(store);
  const { count, loading } = state;
  const { add } = actions;

  useEffect(() => {
    add(1);
  }, [add]);

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
    }, 1000);
  });
}

const StyledAsyncCalls = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
