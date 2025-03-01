import { useState } from 'react';

import { action } from '@storybook/addon-actions';

import { StoryContainer } from '../../../.storybook/story-container';

import Button from './';

export default {
    title: 'Button',
};

const LoadableButton = (props) => {
    const [loading, setLoading] = useState(false);

    return (
        <Button
            loading={loading}
            onClick={() => setLoading(!loading)}
            {...props}
        />
    );
};

export const Primary = () => (
    <StoryContainer>
        <div className="flex grow-0 gap-8">
            <Button onClick={action('clicked')}>Text</Button>
            <Button onClick={action('clicked')}>Text</Button>
            <Button onClick={action('clicked')}>Text</Button>
        </div>
    </StoryContainer>
);

export const Outline = () => (
    <StoryContainer>
        <div className="flex grow-0 gap-8">
            <Button variant="outline" onClick={action('clicked')}>
                Text
            </Button>
            <Button variant="outline" onClick={action('clicked')}>
                Text
            </Button>
            <Button variant="outline" onClick={action('clicked')}>
                Text
            </Button>
        </div>
    </StoryContainer>
);

export const Ghost = () => (
    <StoryContainer>
        <div className="flex grow-0 gap-8">
            <Button variant="ghost" onClick={action('clicked')}>
                Text
            </Button>
            <Button variant="ghost" onClick={action('clicked')}>
                Text
            </Button>
            <Button variant="ghost" onClick={action('clicked')}>
                Text
            </Button>
        </div>
    </StoryContainer>
);

export const Loader = () => (
    <StoryContainer>
        <LoadableButton>Click to Load</LoadableButton>
    </StoryContainer>
);
