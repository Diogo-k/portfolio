import { StoryContainer } from '../../../.storybook/story-container';

import Tag from './';

export default {
    title: 'Tags',
    component: Tag,
};

export const Tags = () => (
    <StoryContainer>
        <div className="space-y-8">
            <div>
                <h3 className="mb-4 text-lg font-semibold">Frontend</h3>
                <div className="flex flex-wrap gap-4">
                    <Tag>HTML</Tag>
                    <Tag>CSS</Tag>
                    <Tag>JavaScript</Tag>
                    <Tag>React</Tag>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-lg font-semibold">Backend</h3>
                <div className="flex flex-wrap gap-4">
                    <Tag>Node.js</Tag>
                    <Tag>Express</Tag>
                    <Tag>MongoDB</Tag>
                </div>
            </div>
            <div>
                <h3 className="mb-4 text-lg font-semibold">Tools</h3>
                <div className="flex flex-wrap gap-4">
                    <Tag>Git</Tag>
                    <Tag>Docker</Tag>
                    <Tag>VS Code</Tag>
                </div>
            </div>
        </div>
    </StoryContainer>
);
