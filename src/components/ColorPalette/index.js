import { Text } from '@/components';

/**
 * A component that displays the application's color palette in a grid layout.
 * Shows both light and dark mode variants of each color with their names.
 * Useful for development and design system documentation.
 *
 * @returns {JSX.Element} A grid of color swatches with their names
 */
export default function ColorPalette() {
    const colors = [
        { name: 'Primary', className: 'bg-primary-light dark:bg-primary-dark' },
        { name: 'Accent', className: 'bg-accent-light dark:bg-accent-dark' },
        {
            name: 'Background',
            className: 'bg-background-light dark:bg-background-dark',
        },
        {
            name: 'Surface',
            className: 'bg-surface-light dark:bg-surface-dark',
        },
        { name: 'Text', className: 'bg-text-light dark:bg-text-dark' },
        { name: 'Muted', className: 'bg-muted-light dark:bg-muted-dark' },
        { name: 'Border', className: 'bg-border-light dark:bg-border-dark' },
    ];

    return (
        <div className="p-6">
            <Text as="h1" size="text-2xl" weight="font-bold" className="mb-6">
                Color Palette
            </Text>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {colors.map((color) => (
                    <div
                        key={color.name}
                        className="flex flex-col overflow-hidden rounded-lg border border-border-light dark:border-border-dark"
                    >
                        <h3 className="border-b border-border-light bg-background-light px-4 py-2 text-lg font-semibold text-text-light dark:border-border-dark dark:bg-background-dark dark:text-text-dark">
                            {color.name}
                        </h3>
                        <div className="flex">
                            <div
                                className={`h-24 w-full ${color.className} flex items-center justify-center`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
