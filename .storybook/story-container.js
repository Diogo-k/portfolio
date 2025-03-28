import { ThemeSwitcher } from '@/components';
import ThemeProvider from '../src/utils/ThemeProvider';

export const StoryContainer = ({ children }) => (
    <div className="story-container h-screen w-screen bg-background-light p-6 dark:bg-background-dark">
        <ThemeProvider attribute="data-mode" defaultTheme="system" enableSystem>
            <ThemeSwitcher className="absolute right-4 top-4" />
            {children}
        </ThemeProvider>
    </div>
);
