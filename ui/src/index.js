import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import {ThemeProvider} from 'react-bootstrap'

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
    >
        <App />
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
