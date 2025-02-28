import { StoryContainer } from '../../../.storybook/story-container';

import Text from './';

export default {
    title: 'Text',
};

export const Size = () => (
    <StoryContainer>
        <div className="flex flex-col gap-8">
            <Text size="2xl">2XLarge</Text>

            <Text size="xl">XLarge</Text>

            <Text size="lg">Large</Text>

            <Text size="base">Base</Text>

            <Text size="sm">Small</Text>
        </div>
    </StoryContainer>
);

export const Weight = () => (
    <StoryContainer>
        <div className="flex flex-col gap-8">
            <Text weight="bold" size="xl">
                Bold
            </Text>

            <Text weight="semibold" size="xl">
                Semibold
            </Text>

            <Text weight="normal" size="xl">
                Normal
            </Text>

            <Text weight="thin" size="xl">
                Thin
            </Text>
        </div>
    </StoryContainer>
);

export const Align = () => (
    <StoryContainer>
        <div className="flex flex-col items-stretch gap-8">
            <Text align="start" weight="normal" size="xl">
                Start
            </Text>

            <Text align="center" weight="normal" size="xl">
                Center
            </Text>
        </div>
    </StoryContainer>
);
