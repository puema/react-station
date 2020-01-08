import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { Stateful } from './Stateful';

export const App = () => {
  return (
    <Router>
      <StyledApp>
        <GlobalStyles />
        <Switch>
          <Route path="/" component={Stateful} />
        </Switch>
      </StyledApp>
    </Router>
  );
};

const StyledApp = styled.div`
  //width: 100vw;
  //height: 100vh;
`;

const GlobalStyles = createGlobalStyle`
  body {
   margin: 0;
   font-family: Roboto, sans-serif;
  }
`;
