import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('show App', () => {
    render(<App />);
    const container = screen.getByText('React');
    expect(container).toBeInTheDocument();
});
