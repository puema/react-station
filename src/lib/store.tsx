import React, { useEffect, useRef, useState } from 'react';

type Actions = { [key: string]: (...args: any[]) => void };
type ActionsWithState<S> = { [key: string]: (state: S, ...args: any[]) => Partial<S> };

export interface Store<S, A extends ActionsWithState<S>> {
  getState(): S;
  setState(state: Partial<S>): void;
  useStore(select?: (s: S) => unknown): { state: S; actions: Actions };
}

export function createStore<S, A extends ActionsWithState<S>>(initialState: S, initialActions: A) {
  const store: { state: S; actions: Actions } = {
    state: initialState,
    actions: initialActions,
  };

  const listeners: (() => void)[] = [];

  async function setState(update: Partial<S> | Promise<Partial<S>>) {
    const merge = await update;
    store.state = { ...store.state, ...merge };
    listeners.forEach(listener => listener());
  }

  return {
    setState,

    getState() {
      return store.state;
    },

    useStore(select: (s: S) => unknown = s => s) {
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

export function useStore<S, A extends ActionsWithState<S>>(
  store: Store<S, A>,
  select?: (s: S) => unknown
) {
  return store.useStore(select);
}

function injectState<A extends ActionsWithState<S>, S>(
  actionsWithState: A,
  state: S,
  setState: (state: Partial<S>) => void
) {
  return Object.keys(actionsWithState).reduce((actions, key) => {
    actions[key] = (...args: unknown[]) => setState(actionsWithState[key](state, ...args));
    return actions;
  }, {} as Actions);
}
