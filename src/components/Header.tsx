import React from 'react';
import styled from 'styled-components';

export function Header() {
  return (
    <StyledHeader>
      <span>Update</span>
      <span>Async Calls</span>
      <span>Mount/Unmount</span>
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 64px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid grey;

  & > * {
    margin: 0 16px;
  }
`;
