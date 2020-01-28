import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { AsyncCalls } from '../pages/async-calls/AsyncCalls';
import { ColorTree } from '../pages/color-tree/ColorTree';
import { MountUnmount } from '../pages/mount-unmount/MountUnmount';
import { Header } from './Header';

export const App = () => {
  return (
    <Router basename="/">
      <StyledApp>
        <GlobalStyles />
        <Header />
        <Content>
          <Switch>
            <Route path="/" exact component={ColorTree} />
            <Route path="/async-calls" component={AsyncCalls} />
            <Route path="/mount-unmount" component={MountUnmount} />
          </Switch>
        </Content>
      </StyledApp>
    </Router>
  );
};

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Open Sans', sans-serif;
    background-color: #2b2b2b;
    color: #fff;
    a {
      text-decoration: none;
      color: inherit;      
    }
    button {
      border: none;
      outline: none;
      margin: 16px;
      padding: 8px 16px;
      font-size: 14px;
      color: #a9b7c6;
      font-weight: bolder;
      background-color: #3c3f41;
      border-radius: 999px;
      cursor: pointer;
    }
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;
