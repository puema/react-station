import React from 'react';
import styled from 'styled-components';
import { createStore, useStore } from '../../lib';

const initialState = {
  items: [0, 1, 2],
};

type State = typeof initialState;

const actions = {
  add: ({ items }: State) => ({ items: [...items, items.length] }),
  remove: ({ items }: State) => ({ items: items.slice(0, items.length - 1) }),
};

const store = createStore(initialState, actions);

export const MountUnmount = () => {
  const { state, actions } = useStore(store);
  const { items } = state;
  const { add, remove } = actions;

  return (
    <Center>
      <Stretch>
        <div>
          <Button onClick={add}>Add</Button>
          <Button onClick={remove}>Remove</Button>
        </div>
        <Items>
          {items.map(item => (
            <Subscriber key={item} />
          ))}
        </Items>
      </Stretch>
    </Center>
  );
};

export const Subscriber = () => {
  const { state } = useStore(store);
  const { items } = state;

  return <StyledSubscriber>{items.length}</StyledSubscriber>;
};

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const Stretch = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  min-width: 128px;
`;

const Items = styled.div`
  width: 100%;
`;

const StyledSubscriber = styled.div`
  box-sizing: border-box;
  background-color: #3c3f41;
  border-radius: 8px;
  padding: 4px 16px;
  margin: 16px;
  display: flex;
  justify-content: center;
`;
