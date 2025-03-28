import { StoryContainer } from '../../../.storybook/story-container';

import ColorPaletteComponent from './';

export default {
    title: 'Tools/ColorPalette',
    component: ColorPaletteComponent,
};

export const ColorPalette = () => (
    <StoryContainer>
        <ColorPaletteComponent />
    </StoryContainer>
);
