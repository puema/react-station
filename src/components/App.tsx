import React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import styled from "styled-components";
import { AsyncCalls } from "../pages/async-calls/AsyncCalls";
import { ColorTree } from "../pages/color-tree/ColorTree";
import { MountUnmount } from "../pages/mount-unmount/MountUnmount";
import { GlobalStyles } from "../styles/globalStyles";
import { GitHubCorner } from "./GitHubCorner";
import { Header } from "./Header";

export const App = () => {
  return (
    <HashRouter basename="/">
      <StyledApp>
        <GlobalStyles />
        <Header />
        <GitHubCorner url="https://github.com/puema/react-station" />
        <Content>
          <Switch>
            <Route path="/" exact component={ColorTree} />
            <Route path="/async-calls" component={AsyncCalls} />
            <Route path="/mount-unmount" component={MountUnmount} />
          </Switch>
        </Content>
      </StyledApp>
    </HashRouter>
  );
};

const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  flex-grow: 1;
`;
