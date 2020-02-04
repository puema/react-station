import { createStore, useStore } from '../src/lib';

const initialState = {
  count: 0,
};

type State = typeof initialState;

const actions = {
  // The Current state is passed as first parameter to the actions
  increment({ count }: State) {
    // The return value should be a Partial<State> and will be merged
    return { count: count + 1 };
  },

  // Payload is available as following parameters
  add({ count }: State, value: number) {
    return {
      count: count + value,
    };
  },

  // Actions can also be async
  async calculateSum({ count }: State, value: number) {
    const result = await asyncCalculation(count, value);
    // Make sure to access state after async calls via
    // store.getState() to avoid race conditions
    return {
      count: result,
    };
  },
};

// Multiple instances of different stores can be created
const store = createStore(initialState, actions);

export const Component = () => {
  // Simply retrieve state and actions via hooks
  const { state, actions } = useStore(store);
  // Or select a part of the state to avoid unnecessary rerenders
  const { state: state2 } = useStore(store, s => s.count);

  const { add } = actions;

  add(1); // ok
  add('1'); // Error: '1' is not assignable to parameter of type 'number'.
};

// ----
const asyncCalculation = (a: number, b: number) => a + b;
