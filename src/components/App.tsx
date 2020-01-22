import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { AsyncCalls } from '../pages/async-calls/AsyncCalls';
import { ColorTree } from '../pages/color-tree/ColorTree';
import { Header } from './Header';

export const App = () => {
  return (
    <Router>
      <StyledApp>
        <GlobalStyles />
        <Header />
        <Content>
          <Switch>
            <Route path="/async-calls" component={AsyncCalls} />
            <Route path="/mount-unmount" component={ColorTree} />
            <Route path="/" component={ColorTree} />
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
   font-family: "Open Sans", sans-serif;
    a {
      text-decoration: none;
      color: inherit;      
    }
    button {
      border: none;
      outline: none;
    }
  }
`;

const Content = styled.div`
  flex-grow: 1;
`;
