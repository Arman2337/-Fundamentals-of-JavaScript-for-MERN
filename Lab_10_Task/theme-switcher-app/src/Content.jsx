import React from 'react';
import { useTheme } from './ThemeContext';

function Content() {
  const { theme } = useTheme();

  const lightTheme = {
    backgroundColor: '#ffffff',
    color: '#000000',
  };

  const darkTheme = {
    backgroundColor: '#1e1e1e',
    color: '#ffffff',
  };

  const styles = theme === 'light' ? lightTheme : darkTheme;

  return (
    <div style={{ ...styles, minHeight: '100vh', padding: '50px', transition: 'all 0.3s ease' }}>
      <h1>Theme Switcher App</h1>
      <p>This is an example of using React Context to manage global theme state.</p>
    </div>
  );
}

export default Content;
