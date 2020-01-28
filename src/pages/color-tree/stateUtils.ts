import { MyNode, Node as NodeType } from './types';

export const maxDepth = 5;

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