<div align="center">
  <p style="font-size: 64px">🚉</p>
  <p style="font-size: 24px">
    <b>Sta</b>te & Ac<b>tion</b>
  </p>
  <p>
  Easy to use state and actions for React. Optimized rerenders with state selection. Typesafe. Async actions.
  </p>
  <br />
  <img src="https://img.shields.io/npm/v/react-staction.svg?style=flat-square" alt="npm">
  <img src="https://badgen.net/bundlephobia/minzip/react-station" alt="gzip size">
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</div>

## Why

😎 Easy to use

🦶 Small footprint

🚀 Performance optimized

⛑ Typesafe with TypeScript

## Usage

```jsx
const initialState = {
  count: 0,
};

type State = typeof initialState;

const actions = {
  add: ({ count }: State, value: number) {
    return {
      count: count + value,
    };
  },
};

const store = createStore(initialState, actions);

export const Component = () => {
  // optionally select state to avoid unnecessary rerenders
  const { state, actions } = useStore(store, s => s.count);
  const { count } = state;
  const { add } = actions;

  return (
    <>
      <button onClick={() => add(1)}>Very expensive calculation</button>
      <span>{value}</span>
    </>
  );
}

```
