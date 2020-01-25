import { useEffect, useRef, useState } from 'react';

export interface Store<S, A extends ActionMap<S>> {
  getState(): S;
  setState(state: Partial<S>): void;
  useStore(select?: (s: S) => any): { state: S; actions: BoundActionMap<A> };
}

export function createStore<S, A extends ActionMap<S>>(initialState: S, initialActions: A) {
  let state = initialState;
  const listeners: (() => void)[] = [];

  async function setState(update: Partial<S> | Promise<Partial<S>>) {
    const merge = await update;
    state = { ...state, ...merge };
    listeners.forEach(listener => listener());
  }

  return {
    getState() {
      return state;
    },

    setState,

    useStore(select: (s: S) => unknown = s => s) {
      const [, forceUpdate] = useState();
      const lastSelected = useRef(select(state));
      useEffect(() => {
        const listener = () => {
          const selected = select(state);
          if (selected !== lastSelected.current) {
            forceUpdate({});
            lastSelected.current = selected;
          }
        };
        listeners.push(listener);
        return () => {
          listeners.splice(
            listeners.findIndex(l => l === listener),
            1
          );
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
      const actions = bindActions(initialActions, state, setState);
      return { state, actions };
    },
  };
}

export function useStore<S, A extends ActionMap<S>>(store: Store<S, A>, select?: (s: S) => any) {
  return store.useStore(select);
}

function bindActions<A extends ActionMap<S>, S>(
  actionsWithState: A,
  state: S,
  setState: (state: Partial<S> | Promise<Partial<S>>) => void
) {
  return Object.keys(actionsWithState).reduce((actions, key) => {
    (actions[key] as any) = (...args: any[]) => setState(actionsWithState[key](state, ...args));
    return actions;
  }, {} as BoundActionMap<A>);
}

type Action<S> = (state: S, ...props: any[]) => Partial<S> | Promise<Partial<S>>;
type ActionMap<S> = { [key: string]: Action<S> };
type BoundAction<A> = A extends (state: any, ...args: infer P) => any
  ? (...args: P) => void
  : never;
type BoundActionMap<A> = {
  [K in keyof A]: BoundAction<A[K]>;
};
