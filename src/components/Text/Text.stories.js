import { StoryContainer } from '../../../.storybook/story-container';

import Text from './';

export default {
    title: 'Components/Text',
};

export const Size = () => (
    <StoryContainer>
        <div className="flex flex-col gap-8">
            <Text size="text-2xl">2XLarge</Text>

            <Text size="text-xl">XLarge</Text>

            <Text size="text-lg">Large</Text>

            <Text size="text-base">Base</Text>

            <Text size="text-sm">Small</Text>
        </div>
    </StoryContainer>
);

export const Weight = () => (
    <StoryContainer>
        <div className="flex flex-col gap-8">
            <Text weight="font-bold" size="text-xl">
                Bold
            </Text>

            <Text weight="font-semibold" size="text-xl">
                Semibold
            </Text>

            <Text weight="font-normal" size="text-xl">
                Normal
            </Text>

            <Text weight="font-thin" size="text-xl">
                Thin
            </Text>
        </div>
    </StoryContainer>
);

export const Align = () => (
    <StoryContainer>
        <div className="flex flex-col items-stretch gap-8">
            <Text align="text-start" weight="font-normal" size="text-xl">
                Start
            </Text>

            <Text align="text-center" weight="font-normal" size="text-xl">
                Center
            </Text>

            <Text align="text-end" weight="font-normal" size="text-xl">
                End
            </Text>
        </div>
    </StoryContainer>
);
