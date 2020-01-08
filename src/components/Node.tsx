import React, { memo } from 'react';
import styled from 'styled-components';
import { findNode } from '../state/createState';
import { useSelect } from '../state/store';
import { store } from './Stateful';

export const Node = memo(({ id, className }: { id: string; className?: string }) => {
  const { state, actions } = useSelect(store, s => findNode(s, id));
  const node = findNode(state, id);
  if (!node) return null;
  const { key, value, children } = node;
  const { color, count } = value;
  const { setColor, setCount } = actions;

  function stopPropagation<F extends Function>(fn?: F) {
    return (event: React.SyntheticEvent) => {
      event.stopPropagation();
      if (fn) fn(event);
    };
  }

  const changeColor = () => {
    setColor({ key, color: generateRandomColor() });
  };

  const changeCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCount({ key, count: event.target.value });
  };

  return (
    <Container className={className} color={color} onClick={stopPropagation(changeColor)}>
      <Input
        value={count}
        type="number"
        onChange={stopPropagation(changeCount)}
        onClick={stopPropagation()}
      />
      {children.map((child: any) => (
        <Node key={child.key} id={child.key} />
      ))}
    </Container>
  );
});

const generateRandomColor = () => {
  const random = () => Math.random() * 255;
  return `rgb(${random()}, ${random()}, ${random()})`;
};

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, auto);
  margin: 8px;
  background-color: ${({ color }) => color};
  padding-top: 1em;
`;

const Input = styled.input`
  grid-column: 1 / span 2;
  justify-self: center;
  width: 20px;
`;
