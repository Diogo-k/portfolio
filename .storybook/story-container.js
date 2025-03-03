import { ThemeSwitcher } from '@/components';
import ThemeProvider from '../src/utils/ThemeProvider';

export const StoryContainer = ({ children }) => (
    <div className="story-container h-screen w-screen bg-background-light p-6 dark:bg-background-dark">
        <ThemeProvider attribute="data-mode" defaultTheme="system" enableSystem>
            <ThemeSwitcher />
            {children}
        </ThemeProvider>
    </div>
);
