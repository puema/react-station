import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
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
    input {
      border: none;
      background-color: #3c3f41;
    }
  }
`;
