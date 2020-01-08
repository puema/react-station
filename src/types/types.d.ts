export interface Node<T> {
  key: string;
  value: T;
  children: Node<T>[];
}

export interface NodeValue {
  color: string;
  count: number;
}

export type MyNode = Node<NodeValue>;

export interface WithClassName {
  className?: string;
}

export interface VisibleProps {
  isVisible?: boolean;
}