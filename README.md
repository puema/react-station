<div align="center">
  <img width="128px" src="./docs/station.png" alt="station">
  <p>
    <b>Sta</b>te & Ac<b>tion</b>
  </p>
  <p>
    Easy to use state and actions for React. Optimized rerenders with state selection. Typesafe. Async actions.
  </p>
  <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
</div>

[Demo](https://puema.github.io/react-station/)

## Why

😎 Easy to use <br />
🦶 Small footprint <br />
🚀 Performance optimized <br />
⛑ Typesafe with TypeScript <br />

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
