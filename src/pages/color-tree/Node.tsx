import React, { memo } from 'react';
import styled from 'styled-components';
import { findNode } from './createState';
import { useStore } from '../../lib';
import { store } from './ColorTree';

export const Node = memo(({ id, className }: { id: string; className?: string }) => {
  const { state, actions } = useStore(store);

  const node = findNode(state, id);
  if (!node) return null;

  const { key, value, children } = node;
  const { color } = value;
  const { setColor } = actions;

  const changeColor = () => {
    setColor({ key, color: generateRandomColor() });
  };

  return (
    <Container className={className} color={color} onClick={stopPropagation(changeColor)}>
      {children.map((child: any) => (
        <Node key={child.key} id={child.key} />
      ))}
    </Container>
  );
});

function stopPropagation<F extends Function>(fn?: F) {
  return (event: React.SyntheticEvent) => {
    event.stopPropagation();
    if (fn) fn(event);
  };
}

function generateRandomColor() {
  const random = () => Math.random() * 255;
  return `rgba(${random()}, ${random()}, ${random()}, 0.2)`;
}

const Container = styled.div`
  display: grid;
  box-sizing: border-box;
  grid-template-columns: repeat(2, auto);
  margin: 0.5vh 0.5vw;
  min-width: 4px;
  min-height: 4px;
  background-color: ${({ color }) => color};
`;
