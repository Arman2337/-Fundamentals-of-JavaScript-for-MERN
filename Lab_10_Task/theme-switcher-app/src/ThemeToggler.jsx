import React from 'react';
import { useTheme } from './ThemeContext';

function ThemeToggler() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button
        onClick={toggleTheme}
        style={{
          padding: '10px 20px',
          cursor: 'pointer',
          backgroundColor: theme === 'light' ? '#333' : '#f4f4f4',
          color: theme === 'light' ? '#fff' : '#000'
        }}
      >
        Toggle to {theme === 'light' ? 'Dark' : 'Light'} Theme
      </button>
    </div>
  );
}

export default ThemeToggler;
