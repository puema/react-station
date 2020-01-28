import { useEffect, useRef, useState } from 'react';

export interface Store<S, A extends ActionMap<S>> {
  getState(): S;
  getActions(): BoundActionMap<A>;
  setState(state: Partial<S> | Promise<Partial<S>>): void | Promise<void>;
  useStore(select?: (s: S) => any): { state: S; actions: BoundActionMap<A> };
}

export function createStore<S, A extends ActionMap<S>>(
  initialState: S,
  initialActions: A | ((store: Store<S, A>) => A)
) {
  let state = initialState;
  let actions: BoundActionMap<A>;
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

    getActions() {
      return actions;
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
      actions = bindActions(this, initialActions);
      return { state, actions };
    },
  };
}

export function useStore<S, A extends ActionMap<S>>(store: Store<S, A>, select?: (s: S) => any) {
  return store.useStore(select);
}

function bindActions<A extends ActionMap<S>, S>(
  store: Store<S, A>,
  unboundActions: A | ((store: Store<S, A>) => A)
) {
  const { getState, setState } = store;
  const actions = typeof unboundActions === 'function' ? unboundActions(store) : unboundActions;

  return Object.keys(actions).reduce((boundActions, key) => {
    (boundActions[key] as any) = (...args: any[]) => setState(actions[key](getState(), ...args));
    return boundActions;
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
