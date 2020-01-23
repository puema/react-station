import { createStore } from 'redux';
import { MyNode, Node as NodeType, NodeValue } from './types';

export const maxDepth = 4;

export const createNodes = (depth: number = 0, key: string = '0'): MyNode => {
  const node: MyNode = {
    key,
    value: {
      color: `rgba(255, 255, 255, 0.1)`,
      count: 0,
    },
    children: [],
  };

  if (depth < maxDepth) {
    node.children = new Array(4)
      .fill(undefined)
      .map((_, index) => createNodes(depth + 1, `${key}-${index}`));
  }

  return node;
};

export function updateNode<T>(ancestor: NodeType<T>, key: string, value: Partial<T>): NodeType<T> {
  if (ancestor.key === key) {
    return {
      key,
      children: ancestor.children,
      value: { ...ancestor.value, ...value },
    };
  }

  for (let i = 0; i < ancestor.children.length; i++) {
    ancestor.children[i] = updateNode(ancestor.children[i], key, value);
  }

  return ancestor;
}

export function findNode<T>(node: NodeType<T>, key: string): NodeType<T> | undefined {
  if (node.key === key) {
    return node;
  }
  for (let child of node.children) {
    const result = findNode(child, key);
    if (result) return result;
  }
}

function reducer(state: MyNode = createNodes(), {key, value}: {key: string, value: Partial<NodeValue>}) {
  return { ...updateNode(state, key, value) }
}

export const reduxStore = createStore(reducer as any);