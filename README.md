<div align="center">
  <img width="128px" src="./docs/station.png" alt="station">
  <p>
    React Station - <b>Sta</b>te & Ac<b>tion</b>
  </p>
  <p>
    Easy to Use • Hooks • State Selection • Optimized Rerenders • Typesafe • Async Support<br/>
    <a href="https://puema.github.io/react-station/">Demo</a>
  </p>
  <p>
    <a href="https://www.npmjs.org/package/react-station">
      <img src="https://img.shields.io/npm/v/react-station.svg?style=flat-square" alt="npm version">
    </a>
    <a href="https://www.npmjs.org/package/react-station">
      <img src="https://img.shields.io/npm/dw/react-station.svg?style=flat-square" alt="npm downloads">
    </a>
    <a href="https://bundlephobia.com/result?p=react-station">
      <img src="https://img.shields.io/bundlephobia/minzip/react-station?style=flat-square" alt="gzip size">
    </a>
    <a href="https://prettier.io/">
      <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
    </a>
  </p>
</div>

## Why

😎 Easy to use <br />
🦶 Small footprint <br />
🚀 Performance optimized <br />
⛑ Typesafe with TypeScript <br />

[Redux](https://github.com/reduxjs/react-redux) was always too verbose for my personal taste. React [Contex](https://reactjs.org/docs/context.html) is great, but there is no optimized state subscribtion. I do like the approach of [unistore](https://reactjs.org/docs/context.html) with the bound actions a lot. However I prefer Hooks over the `connect()` API and I wanted the actions to be part of the store. So I created react-station, a simple state management with a lot of parallels to unistore and `useSelect()` from redux.

## Usage

```jsx
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
```
