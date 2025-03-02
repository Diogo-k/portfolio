import { ThemeSwitcher } from '@/components';

export const StoryContainer = ({ children }) => (
    <div className="story-container h-screen w-screen bg-background-light p-6 transition-colors duration-200 dark:bg-background-dark">
        <ThemeSwitcher />
        {children}
    </div>
);
