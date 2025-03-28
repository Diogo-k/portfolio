import { StoryContainer } from '../../../.storybook/story-container';
import Link from './index';

export default {
    title: 'Components/Link',
    component: Link,
    argTypes: {
        variant: {
            control: 'select',
            options: ['header', 'inline'],
            description: 'The visual style variant of the link',
        },
        href: {
            control: 'text',
            description: 'The URL the link points to',
        },
        isExternal: {
            control: 'boolean',
            description: 'Whether the link opens in a new tab',
        },
        ariaLabel: {
            control: 'text',
            description: 'Custom aria-label for accessibility',
        },
        ariaCurrent: {
            control: 'text',
            description: 'Current state of the link for accessibility',
        },
        active: {
            control: 'boolean',
            description: 'Whether the link is active',
        },
        className: {
            control: 'text',
            description: 'Additional CSS classes to apply',
        },
    },
};

const Template = (args) => (
    <StoryContainer>
        <Link {...args} />
    </StoryContainer>
);

export const Header = Template.bind({});
Header.args = {
    href: '#',
    children: 'Header Link',
    variant: 'header',
};

export const Inline = Template.bind({});
Inline.args = {
    href: '#',
    children: 'Inline Link',
    variant: 'inline',
};

export const External = Template.bind({});
External.args = {
    href: 'https://example.com',
    children: 'External Link',
    isExternal: true,
};

const ActiveTemplate = () => (
    <StoryContainer>
        <Link href="#" variant="header" active className="mr-8">
            Active Header Link
        </Link>
        <Link href="#" variant="inline" active>
            Active Inline Link
        </Link>
    </StoryContainer>
);

export const Active = ActiveTemplate.bind({});
