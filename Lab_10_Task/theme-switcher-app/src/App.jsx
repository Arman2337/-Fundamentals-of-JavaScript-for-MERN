import React from 'react';
import { ThemeProvider } from './ThemeContext';
import ThemeToggler from './ThemeToggler';
import Content from './Content';

function App() {
  return (
    <ThemeProvider>
      <ThemeToggler />
      <Content />
    </ThemeProvider>
  );
}

export default App;
