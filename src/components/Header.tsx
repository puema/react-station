import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Header() {
  return (
    <StyledHeader>
      <Link to="/">Update</Link>
      <Link to="async-calls">Async Calls</Link>
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
