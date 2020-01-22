import React from 'react';
import styled from 'styled-components';
import { createStore } from '../../lib/store';
import { createNodes } from './createState';
import { Node } from './Node';
import { MyNode } from './types';

const actions = {
  setColor(state: MyNode, { key, color }: { key: string; color: string }) {
    return setColor(state, state, key, color);
  },
};

export const store = createStore(createNodes(), actions);

export const ColorTree = () => {
  return <StyledNode id="0" />;
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
