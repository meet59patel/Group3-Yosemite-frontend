import { render, screen } from '@testing-library/react';
import App from './App';
import { UserProvider } from './components/context/UserContext';

test('Renders without Crashing | Renders Homepage Text', () => {
    render(
        <UserProvider>
            <App />
        </UserProvider>
    );
    const linkElement = screen.getByText(
        /Automated Solution For Evaluating Assignments/i
    );
    expect(linkElement).toBeInTheDocument();
});
