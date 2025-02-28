export default function ColorPalette() {
    const colors = [
        { name: 'Primary', light: 'bg-primary-light', dark: 'bg-primary-dark' },
        {
            name: 'Secondary',
            light: 'bg-secondary-light',
            dark: 'bg-secondary-dark',
        },
        { name: 'Accent', light: 'bg-accent-light', dark: 'bg-accent-dark' },
        {
            name: 'Tertiary',
            light: 'bg-tertiary-light',
            dark: 'bg-tertiary-dark',
        },
        {
            name: 'Background',
            light: 'bg-background-light',
            dark: 'bg-background-dark',
        },
        { name: 'Surface', light: 'bg-surface-light', dark: 'bg-surface-dark' },
        { name: 'Text', light: 'bg-text-light', dark: 'bg-text-dark' },
        { name: 'Muted', light: 'bg-muted-light', dark: 'bg-muted-dark' },
        { name: 'Border', light: 'bg-border-light', dark: 'bg-border-dark' },
    ];

    return (
        <div className="p-6">
            <h2 className="mb-6 text-2xl font-bold text-text-light dark:text-text-dark">
                Color Palette
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {colors.map((color) => (
                    <div
                        key={color.name}
                        className="flex flex-col overflow-hidden rounded-lg border border-border-light shadow-md dark:border-border-dark"
                    >
                        <h3 className="border-b border-border-light bg-surface-light px-4 py-2 text-lg font-semibold text-text-light dark:border-border-dark dark:bg-surface-dark dark:text-text-dark">
                            {color.name}
                        </h3>
                        <div className="flex">
                            <div
                                className={`h-24 w-1/2 ${color.light} flex items-center justify-center border-r border-border-light dark:border-border-dark`}
                            />
                            <div
                                className={`h-24 w-1/2 ${color.dark} flex items-center justify-center`}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
