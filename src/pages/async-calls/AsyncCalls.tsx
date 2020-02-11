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
  async add({ count }: State, value: number): Promise<State> {
    getActions().load();
    const result = await expensiveCalculation(count, value);
    return {
      count: result,
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

async function expensiveCalculation(a: number, b: number): Promise<number> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(a + b);
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
