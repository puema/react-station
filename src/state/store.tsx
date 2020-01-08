import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

type Actions = { [key: string]: (...args: any[]) => void };
type ActionsWithState<S> = { [key: string]: (state: S, ...args: any[]) => S };

export interface Store<S, A extends ActionsWithState<S>> {
  setState(state: S): void;
  useSelect(select: (s: S) => any): { state: S; actions: Actions };
}

export function createStore<S, A extends ActionsWithState<S>>(initialState: S, initialActions: A) {
  const store: { state: S; actions: Actions } = {
    state: initialState,
    actions: initialActions,
  };

  const listeners: (() => void)[] = [];

  function setState(state: S) {
    store.state = state;
    listeners.forEach(listener => listener());
  }

  return {
    setState,

    useSelect(select: (s: S) => any = s => s) {
      const [, forceUpdate] = useState();
      const lastSelected = useRef(select(store.state));
      useEffect(() => {
        listeners.push(() => {
          const selected = select(store.state);
          if (selected !== lastSelected.current) {
            forceUpdate({});
            lastSelected.current = selected;
          }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      store.actions = injectState(initialActions, store.state, setState);
      return store;
    },
  };
}

export function useSelect<S, A extends ActionsWithState<S>>(
  store: Store<S, A>,
  select: (s: S) => any = s => s
) {
  return store.useSelect(select);
}

function injectState<A extends ActionsWithState<S>, S>(
  actionsWithState: A,
  state: S,
  setState: (state: S) => void
) {
  return Object.keys(actionsWithState).reduce(
    (actions, key) => {
      actions[key] = (...args: any[]) => setState(actionsWithState[key](state, ...args));
      return actions;
    },
    {} as Actions
  );
}

const Context = createContext<any>({});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createSelectHook<S, A extends ActionsWithState<S>>() {
  const useStoreContext = () => useContext((Context as unknown) as React.Context<Store<S, A>>);

  return function useSelect<S>(select: (s: S) => any = s => s) {
    const store = useStoreContext();
    return store.useSelect;
  };
}

// export const useSelect = createSelectHook();
