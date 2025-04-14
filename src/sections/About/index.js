import { getSpecificMDXContent } from '@/utils/mdx';

import AboutClient from './client';

export default async function About() {
    const about = await getSpecificMDXContent('about');

    if (!about) {
        console.warn(
            '⚠️ About content is completely missing. Check your MDX file.'
        );
    }

    return <AboutClient about={about} />;
}
