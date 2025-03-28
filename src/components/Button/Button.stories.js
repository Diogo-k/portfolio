import { useState } from 'react';

import { StoryContainer } from '../../../.storybook/story-container';

import Button from './';

export default {
    title: 'Components/Button',
    component: Button,
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'outline', 'ghost'],
            description: 'The visual style of the button',
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the button',
        },
        fullWidth: {
            control: 'boolean',
            description: 'Whether the button is full width',
        },
        disabled: {
            control: 'boolean',
            description: 'Whether the button is disabled',
        },
        loading: {
            control: 'boolean',
            description: 'Whether the button is in a loading state',
        },
        loadingText: {
            control: 'boolean',
            description: 'Whether to show text during loading state',
        },
        as: {
            control: 'select',
            options: ['button', 'a', 'link'],
            description: 'The type of element the button renders as',
        },
        href: {
            control: 'text',
            description: 'The URL to link to when the button is an link/anchor',
        },
        onClick: { action: 'clicked' },
    },
};

const Template = (args) => (
    <StoryContainer>
        <Button {...args} />
    </StoryContainer>
);

export const Primary = Template.bind({});
Primary.args = {
    children: 'Primary Button',
    variant: 'primary',
};

export const Outline = Template.bind({});
Outline.args = {
    children: 'Outline Button',
    variant: 'outline',
};

export const Ghost = Template.bind({});
Ghost.args = {
    children: 'Ghost Button',
    variant: 'ghost',
};

export const Sizes = () => (
    <StoryContainer>
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Variant</h3>
                <div className="flex items-center gap-4">
                    <Button variant="primary" size="sm">
                        Small
                    </Button>
                    <Button variant="primary" size="md">
                        Default
                    </Button>
                    <Button variant="primary" size="lg">
                        Large
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Outline Variant</h3>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm">
                        Small
                    </Button>
                    <Button variant="outline" size="md">
                        Default
                    </Button>
                    <Button variant="outline" size="lg">
                        Large
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ghost Variant</h3>
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm">
                        Small
                    </Button>
                    <Button variant="ghost" size="md">
                        Default
                    </Button>
                    <Button variant="ghost" size="lg">
                        Large
                    </Button>
                </div>
            </div>
        </div>
    </StoryContainer>
);

export const AllStates = () => (
    <StoryContainer>
        <div className="space-y-8">
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Primary Variant</h3>
                <div className="flex items-center gap-4">
                    <Button variant="primary">Default</Button>
                    <Button variant="primary" disabled>
                        Disabled
                    </Button>
                    <Button variant="primary" loading>
                        Loading
                    </Button>
                    <Button variant="primary" loading loadingText={false}>
                        Loading Only
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Outline Variant</h3>
                <div className="flex items-center gap-4">
                    <Button variant="outline">Default</Button>
                    <Button variant="outline" disabled>
                        Disabled
                    </Button>
                    <Button variant="outline" loading>
                        Loading
                    </Button>
                    <Button variant="outline" loading loadingText={false}>
                        Loading Only
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Ghost Variant</h3>
                <div className="flex items-center gap-4">
                    <Button variant="ghost">Default</Button>
                    <Button variant="ghost" disabled>
                        Disabled
                    </Button>
                    <Button variant="ghost" loading>
                        Loading
                    </Button>
                    <Button variant="ghost" loading loadingText={false}>
                        Loading Only
                    </Button>
                </div>
            </div>
        </div>
    </StoryContainer>
);

export const InteractiveLoading = () => {
    const [loading, setLoading] = useState(false);

    return (
        <StoryContainer>
            <div className="flex items-center gap-4">
                <Button
                    loading={loading}
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 2000);
                    }}
                >
                    Click to Load
                </Button>
                <Button
                    variant="outline"
                    loading={loading}
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 2000);
                    }}
                >
                    Outline Loading
                </Button>
                <Button
                    variant="ghost"
                    loading={loading}
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => setLoading(false), 2000);
                    }}
                >
                    Ghost Loading
                </Button>
            </div>
        </StoryContainer>
    );
};
