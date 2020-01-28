import React, { useState } from 'react';
import styled from 'styled-components';
import { createStore } from '../../lib';
import { createNodes, setColor } from './stateUtils';
import { Node } from './Node';
import { MyNode } from './types';

const actions = {
  setColor(state: MyNode, { key, color }: { key: string; color: string }) {
    return setColor(state, state, key, color);
  },
};

export const store = createStore(createNodes(), actions);

export const ColorTree = () => {
  const [useStateSelection, setUseStateSelection] = useState(true);

  return (
    <StyledColorTree>
      <Checkbox>
        <input
          id="state-selection"
          type="checkbox"
          checked={useStateSelection}
          onChange={() => setUseStateSelection(!useStateSelection)}
        />
        <label htmlFor="state-selection">Use State Selection to avoid unnecessary rerenders </label>
        (Hint: Activate "Highlight updates" in React DevTools to verify)
      </Checkbox>
      <StyledNode key={useStateSelection.toString()} id="0" useStateSelection={useStateSelection} />
    </StyledColorTree>
  );
};

// ----==== Styles ====---- //
const StyledColorTree = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Checkbox = styled.div`
  margin: 8px;
  color: #6f6f6f;
  font-size: 12px;
  & > input {
    margin-right: 8px;
  }
`;

const StyledNode = styled(Node)`
  flex-grow: 1;
  margin: 0;
`;
