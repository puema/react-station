import React, { createContext } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import styled from 'styled-components';
import { createNodes, reduxStore, updateNode } from '../../state/createState';
import { createStore } from '../../state/store';
import { MyNode } from '../../types/types';
import { Node } from './Node';

const actions = {
  setColor(state: MyNode, { key, color }: { key: string; color: string }) {
    return setColor(state, state, key, color);
  },
};

export const store = createStore(createNodes(), actions);

export const ColorTree = () => {
  return (
      <StyledNode id="0" />
  );
};

export function setColor(root: MyNode, parent: MyNode, key: string, color: string): MyNode {
  if (root.key === key) {
    root.value.color = color;
    return { ...root };
  }

  let foundRightChildren = false;

  if (parent.children.some(child => child.key === key)) {
    foundRightChildren = true;
  }

  parent.children.forEach((child, i) => {
    if (foundRightChildren) {
      child.value.color = color;
      parent.children[i] = { ...child };
    } else {
      setColor(root, parent.children[i], key, color);
    }
  });

  return root;
}

const StyledNode = styled(Node)`
  height: 100%;
  margin: 0;
`;
