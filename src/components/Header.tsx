import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export function Header() {
  return (
    <StyledHeader>
      <Left>
        <span role="img" aria-label="station">
          🚉{' '}
        </span>
        React Station
      </Left>
      <Center>
        <Link to="/">Update</Link>
        <Link to="async-calls">Async Calls</Link>
        <Link to="mount-unmount">Mount/Unmount</Link>
      </Center>
      <Right />
    </StyledHeader>
  );
}

const StyledHeader = styled.header`
  height: 64px;
  box-sizing: border-box;
  padding: 16px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #4d4d4d;
`;

const Left = styled.div`
  flex-basis: 20%;
`;

const Center = styled.div`
  flex-basis: 80%;
  display: flex;
  justify-content: center;
  & > * {
    margin: 0 16px;
  }
`;

const Right = styled.div`
  flex-basis: 20%;
`;
